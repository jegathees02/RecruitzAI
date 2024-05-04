from flask import Flask, request, jsonify
from flask_cors import CORS
from IPython import get_ipython
import os
# import subprocess
# import base64
from pyngrok import ngrok
# import random
import librosa
from concurrent.futures import ThreadPoolExecutor
import cv2
import numpy as np
from flask import jsonify
from tensorflow.keras.models import load_model
from moviepy.video.io.VideoFileClip import VideoFileClip


app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = '/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/'
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
    

# def extract_audio(input_file, output_file):
#     command = [
#         "ffmpeg",
#         "-i", input_file,
#         "-y",  # Overwrite output files
#         output_file
#     ]
    
#     subprocess.run(command)
    
def extract_high_quality_audio(video_path, output_audio_path):
    try:
        video_clip = VideoFileClip(video_path)
        audio_clip = video_clip.audio

        # Set high-quality parameters for audio extraction
        audio_clip.write_audiofile(output_audio_path, codec='pcm_s16le', bitrate='384k')

        print(f"High-quality audio extracted and saved to {output_audio_path}")

    except Exception as e:
        print(f"Error: {e}")

def voice_extraction_main():
    input_file = "/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/uploaded_video.webm"  # Replace with the path to your WebM file
    output_file = "/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/output.wav"  # Replace with the desired name for the output MP3 file

    extract_high_quality_audio(input_file, output_file)
    




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
        # print(f"Average Gaze Percentage: {final_output:.2f}")
        print('Calculating')
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

                    print(f'Percentage: {happiness_percentage:.2f}%')
                    # print(f'Sadness Percentage: {sadness_percentage:.2f}%')

                    # Accumulate the happiness and sadness percentages
                    total_happiness_percentage += float(happiness_percentage)
                    # print(type(total_happiness_percentage))
                    print('Analyzing')
                    # total_sadness_percentage += sadness_percentage
                    frame_count += 1

        # Release the video capture
        cap.release()

        if frame_count > 0:
            # Calculate the average happiness and sadness percentages
            average_happiness = total_happiness_percentage / frame_count
            if(average_happiness >= 98):
                return 1
            # average_sadness = total_sadness_percentage / frame_count

            print(f'Average Happiness Percentage: {average_happiness:.2f}%')
            # print(f'Average Sadness Percentage: {average_sadness:.2f}%')
            print(gaze_percentage)  # Fix the format specifier here
            average_result = (average_happiness + float(gaze_percentage)) / 2
            print(f'Average Result: {average_result:.2f}')
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
        audio_file = "/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/output.wav"

        # Load the audio file
        y, sr = librosa.load(audio_file)

        # Calculate the spectrogram
        spectrogram = np.abs(librosa.stft(y))

        # Calculate the spectral centroid
        spectral_centroid = librosa.feature.spectral_centroid(S=spectrogram)

        # Calculate the mean of the spectral centroid
        mean_centroid = np.mean(spectral_centroid)
        print(mean_centroid/25)

        return (mean_centroid / 250) * 2

    except Exception as e:
        # Handle the exception here
        print(f"Error in calculate_clarity: {str(e)}")
        return None  # or any default value you prefer



def calculate_boldness():
    try:
        audio_file = "/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/output.wav"

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




def capture_and_process_video():
    try:
        cap = cv2.VideoCapture(0)  # 0 corresponds to the default camera (you may need to change this if you have multiple cameras)

        # Set the video width and height (adjust as needed)
        cap.set(3, 640)
        cap.set(4, 480)

        # Define the codec and create a VideoWriter object
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter(os.path.join(UPLOAD_FOLDER, 'captured_video.avi'), fourcc, 20.0, (640, 480))

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Display the frame
            cv2.imshow('Captured Video', frame)

            # Write the frame to the output video file
            out.write(frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # Release everything when done
        cap.release()
        out.release()
        cv2.destroyAllWindows()

        captured_video_path = os.path.join(UPLOAD_FOLDER, 'captured_video.avi')

        # Process the captured video
        eye_contact = check_happiness(captured_video_path)
        eye_contact = round(eye_contact, 2)

        if eye_contact == 1:
            print("Eye contact: Need improvement")
            return

        voice_extraction_main()
        clarity = round(float(calculate_clarity()), 2)
        boldness = round(float(calculate_boldness()), 2)
        confidence = round((eye_contact + clarity + boldness) / 3, 2)
        overall = round((eye_contact + boldness + clarity + confidence) // 4, 2)

        print(f"Eye contact: {eye_contact}")
        print(f"Boldness: {boldness}")
        print(f"Clarity: {clarity}")
        print(f"Confidence: {confidence}")
        print(f"Overall: {overall}")

    except Exception as e:
        print(f"Error in capture_and_process_video: {str(e)}")

if __name__ == '__main__':
    capture_and_process_video()