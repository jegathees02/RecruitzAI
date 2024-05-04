from flask import Flask, request, jsonify
from flask_cors import CORS
from IPython import get_ipython
import os
import subprocess
import base64
from pyngrok import ngrok
import random
import librosa
from concurrent.futures import ThreadPoolExecutor
import cv2
import numpy as np
from flask import jsonify
from tensorflow.keras.models import load_model
from openai import OpenAI
# from pathlib import Path
import assemblyai as aai
aai.settings.api_key = "d8406d8369974bb38d5800ea7166eaae"


app = Flask(__name__)
CORS(app)

def check_grammar(input_text):
    client = OpenAI(api_key = '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')
    model = "gpt-3.5-turbo" #"gpt-3.5-turbo-1106"
    messages = [
            {"role": "system", "content": 'The user inputs a text and prompt a percentage value of the grammar of the sentence. If it is incomplete or with errors reduce the marks based on that.output only marks as integer. If the total words is less than 6 then output 15'
            },
            {"role": "user", "content": input_text},
        ]
    response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0
        )
    response_message = response.choices[0].message.content
    print(response_message )
    return response_message

UPLOAD_FOLDER = '/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def upload_video(video_data):        
   

    if video_data:
        video_name = 'uploaded_video.webm'
        video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_name)
        print(video_path)
        print(video_name)
        video_data.save(video_path)  # Save the file
        
        
        
        # return result
        return jsonify({'message': 'Video uploaded successfully'}), 200
    else:
        return jsonify({'error': 'No video data provided'}), 400
    

def extract_audio(input_file, output_file):
    command = [
        "ffmpeg",
        "-i", input_file,
        "-y", output_file,
    ]
    
    subprocess.run(command)

def voice_extraction_main():
    input_file = '/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/uploaded_video.webm'
    output_file = '/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/output.mp3'  # Replace with the desired name for the output MP3 file

    extract_audio(input_file, output_file)
    




def eye_tracking_method(video_path):
    # eye_detector = cv2.CascadeClassifier("/home/jegathees5555/Documents/recruitz/backend/eye_track/haarcascade_eye.xml")
    cascade_classifiers = [
        cv2.CascadeClassifier("/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/haarcascade_eye.xml"),
        cv2.CascadeClassifier("/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/haarcascade_frontalface_default.xml")
        # Add your second Haar Cascade classifier here if needed
    ]

    def process_frame(frame, eye_detector):
        # Convert the frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect the eyes in the frame
        eyes = eye_detector.detectMultiScale(gray, 1.3, 5)

        # Find the center of the eyes
        eye_centers = []
        for eye in eyes:
            eye_center = (eye[0] + eye[2] // 2, eye[1] + eye[3] // 2)
            eye_centers.append(eye_center)

        if len(eye_centers) >= 2:
            # Calculate the distance between the eyes
            eye_distance = np.linalg.norm(np.array(eye_centers[0]) - np.array(eye_centers[1]))

            # Calculate the percentage of how much the user is looking into the camera
            gaze_percentage = eye_distance / (frame.shape[1] // 2)
        else:
            gaze_percentage = -1  # Default value if eyes are not detected

        return gaze_percentage

    cap = cv2.VideoCapture(video_path)
    gaze_percentages = []

    with ThreadPoolExecutor(max_workers=len(cascade_classifiers)) as executor:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Process each frame with different Haar Cascade classifiers in parallel
            results = list(executor.map(process_frame, [frame] * len(cascade_classifiers), cascade_classifiers))

            # Use the results as needed (e.g., take the average)
            average_gaze = sum(results) / len(results)
            gaze_percentages.append(average_gaze)

    cap.release()

    if gaze_percentages:
        final_output = (sum(gaze_percentages) / len(gaze_percentages)) * 99 * -1
        print(f"Average Gaze Percentage: {final_output:.2f}")
        return final_output
    else:
        print("No gaze data available.")
        return jsonify({"error": "No gaze data available."})
    

def classify_emotion(predictions):
    happiness_percentage = predictions[0][0] * 100
    # sadness_percentage = (1 - predictions[0][0]) * 100
    return happiness_percentage


def check_happiness(video_path):
    try:
        cap = cv2.VideoCapture(video_path)
        emotion_model = load_model('/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/imageclassifier.h5')

        # Check if the camera is opened successfully
        if not cap.isOpened():
            print("Error: Could not open camera.")
            return 1

        total_happiness_percentage = 0
        total_sadness_percentage = 0
        frame_count = 0
        gaze_percentage = eye_tracking_method(video_path)
        happiness_percentage = 0  # Moved the initialization here
        sadness_percentage = 1
        # gaze_percentage = eye_tracking_method(video_path)
        
        while True:
            # Capture a single frame
            ret, frame = cap.read()

            # Break the loop if no more frames are available
            if not ret:
                break

            # Call your eye tracking function on the entire frame
            if gaze_percentage < 0 or gaze_percentage == 100:
                print(gaze_percentage)
                return 1

            # Check if the person is looking (gaze_percentage > threshold, adjust the threshold accordingly)
            if gaze_percentage > 0:
                # Check if the frame is too dark or empty
                if np.mean(frame) < 10:
                    happiness_percentage = 1
                    # sadness_percentage = 99
                    return 1
                else:
                    # Resize the frame to match the input size of your emotion classification model
                    resized_frame = cv2.resize(frame, (256, 256))

                    # Normalize pixel values
                    resized_frame = resized_frame.astype('float32') / 255.0

                    # Expand dimensions to create a batch (assuming the model expects a batch input)
                    input_image = np.expand_dims(resized_frame, axis=0)

                    # Make predictions using the emotion classification model
                    predictions = emotion_model.predict(input_image)

                    # Interpret the predictions
                    happiness_percentage = classify_emotion(predictions)
                    print('Analyzing')
                    # print(f'Happiness Percentage: {happiness_percentage:.2f}%')
                    # print(f'Sadness Percentage: {sadness_percentage:.2f}%')

                    # Accumulate the happiness and sadness percentages
                    total_happiness_percentage += float(happiness_percentage)
                    # print(type(total_happiness_percentage))
                    # total_sadness_percentage += sadness_percentage
                    frame_count += 1

        # Release the video capture
        cap.release()

        if frame_count > 0:
            # Calculate the average happiness and sadness percentages
            average_happiness = total_happiness_percentage / frame_count
            # average_sadness = total_sadness_percentage / frame_count

            print(f'Average Happiness Percentage: {average_happiness:.2f}%')
            # print(f'Average Sadness Percentage: {average_sadness:.2f}%')
            print(gaze_percentage)
            if(gaze_percentage > 99): return 1  # Fix the format specifier here
            average_result = (average_happiness + float(gaze_percentage)) / 2
            if(average_result > 99): return 1
            # print(f'Average Result: {average_result:.2f}')
            # print(type(average_result))
            return average_result
        else:
            print("No frames available for processing.")
            return 1

    except Exception as e:
        print(f"Error in check_happiness: {str(e)}")
        return 1



def calculate_clarity():
    try:
        audio_file = "/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/output.mp3"
        
        # URL of the file to transcribe
        # FILE_URL = r"D:\CLG\AI_Interview_recruitz\backend\server\output.mp3"

        # You can also transcribe a local file by passing in a file path
        # FILE_URL = './path/to/file.mp3'

        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(audio_file)

        print(transcript.text)
        if(str(transcript.text) == 'none' or str(transcript.text) == ""):
            result = check_grammar(' yesterday.dont what that this')
        else:
            result = check_grammar(str(transcript.text))

        # return result if result > 1 else 1
        if(int(result) < 15): return 15
        else: return int(result)
        # Load the audio file
        # y, sr = librosa.load(audio_file)

        # # Calculate the spectrogram
        # spectrogram = np.abs(librosa.stft(y))

        # # Calculate the spectral centroid
        # spectral_centroid = librosa.feature.spectral_centroid(S=spectrogram)

        # # Calculate the mean of the spectral centroid
        # mean_centroid = np.mean(spectral_centroid)
        # print(mean_centroid/25)

        # return (mean_centroid / 25) - 30

    except Exception as e:
        # Handle the exception here
        print(f"Error in calculate_clarity: {str(e)}")
        return None  # or any default value you prefer



def calculate_boldness():
    try:
        audio_file = "/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/output.mp3"

        # Load the audio file
        y, sr = librosa.load(audio_file)

        # Calculate the spectrogram
        spectrogram = np.abs(librosa.stft(y))

        # Calculate the spectral contrast
        spectral_contrast = librosa.feature.spectral_contrast(S=spectrogram)

        # Calculate the mean of the spectral contrast
        mean_contrast = np.mean(spectral_contrast)
        # print(type(mean_contrast))

        return (mean_contrast) * 2.2

    except Exception as e:
        # Handle the exception here
        print(f"Error in calculate_boldness: {str(e)}")
        return None  # or any default value you prefer





@app.route('/upload_video_new', methods=['POST'])
def upload_frontend_video():
    try:
         # Remove the assumption of JSON data
        video_data = request.files['videoData']
        upload_video(video_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # try:
    #     result = eye_track_module()
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    
    # result_str = str(result)

    return jsonify({'message': 'Video uploaded successfully', 'result': 0}), 200


@app.route('/get_result', methods=['GET'])
def getResult():
    try:
        video_path = '/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/uploaded_video.webm'
        eye_contact = check_happiness(video_path)
        eye_contact = round(eye_contact,2)
        if(eye_contact == 1) :
            with app.app_context():
                # if(eye_contact == 1):
                return jsonify({ "eye_contact": eye_contact , "boldness" : 1, "clarity" : 1, "confidence" : 1, "overall" : 1})
                # else:
                #     return jsonify({ "eye_contact": eye_contact , "boldness" : boldness, "clarity" : clarity, "confidence" : confidence, "overall" : overall})
        voice_extraction_main()
        # voice_quality_analysis = voice_output.voice_quality()
        clarity = round(float(calculate_clarity()),2)
        boldness = round(float(calculate_boldness()),2)
        # clarity = round(clarity,2)
        # boldness = round(boldness,2)
        confidence = round((eye_contact+clarity+boldness)/3,2)
        # confidence = round(confidence,2)
        overall = round((eye_contact+boldness+clarity+confidence)//4,2)
        # overall = round(overall,2)
        with app.app_context():
            # print("clarity :"+clarity + "confidence: "+confidence +" boldness : "+boldness +" eye_contact : "+eye_contact + "Overall : "+overall)
            # return jsonify({eye_contact})
            return jsonify({ "eye_contact": eye_contact , "boldness" : boldness, "clarity" : clarity, "confidence" : confidence, "overall" : overall})
    except Exception as e:
        print(f"Error in check_happiness: {str(e)}")
        return jsonify({"error": str(e)}), 500

    

if __name__ == '__main__':
    # Set up ngrok and expose the Flask app
    ngrok_tunnel = ngrok.connect(5001)
    print('Public URL:', ngrok_tunnel.public_url)
    app.run(host='localhost', port=5001)