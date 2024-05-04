# import cv2
# from flask import jsonify
# import numpy as np




# def eye_tracking_method(video_path):
#     # Load the eye detector
#     eye_detector = cv2.CascadeClassifier("/home/jegathees5555/Documents/recruitz/backend/eye_track/haarcascade_eye.xml")

#     # Open the video file
#     cap = cv2.VideoCapture(video_path)

#     gaze_percentages = []

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Convert the frame to grayscale
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#         # Detect the eyes in the frame
#         eyes = eye_detector.detectMultiScale(gray, 1.3, 5)

#         # Find the center of the eyes
#         eye_centers = []
#         for eye in eyes:
#             eye_center = (eye[0] + eye[2] // 2, eye[1] + eye[3] // 2)
#             eye_centers.append(eye_center)

#         if len(eye_centers) >= 2:
#             # Calculate the distance between the eyes
#             eye_distance = np.linalg.norm(np.array(eye_centers[0]) - np.array(eye_centers[1]))

#             # Calculate the percentage of how much the user is looking into the camera
#             gaze_percentage = eye_distance / (frame.shape[1] // 2)
#         else:
#             gaze_percentage = -1  # Default value if eyes are not detected

#         gaze_percentages.append(gaze_percentage)

#         # Display the gaze percentage on the frame
#         cv2.putText(frame, f"Gaze Percentage: {gaze_percentage:.2f}", (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

#         # Show the frame
#         cv2.imshow("Frame", frame)

#         # Break the loop if 'q' key is pressed
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     # Release the video capture object and close the windows
#     cap.release()
#     cv2.destroyAllWindows()

#     average_gaze = 0
#     if gaze_percentages:
#         average_gaze = sum(gaze_percentages) / len(gaze_percentages)
#         final_output = average_gaze * -1
#         print(f"Average Gaze Percentage: {average_gaze:.2f}")
#         print(f"{final_output:.2f}")

#     print(final_output)
#     return final_output


from concurrent.futures import ThreadPoolExecutor
import cv2
import numpy as np
from flask import jsonify
from tensorflow.keras.models import load_model

# Load the emotion classification model
emotion_model = load_model('/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/facial_emotion/imageclassifier.h5')
# eye_tracking_model = check_happines  # Replace with your actual eye tracking function

# Function to classify emotion based on the model prediction
def classify_emotion(predictions):
    happiness_percentage = predictions[0][0] * 100
    sadness_percentage = (1 - predictions[0][0]) * 100
    return happiness_percentage, sadness_percentage


def eye_tracking_method(video_path):
    # eye_detector = cv2.CascadeClassifier("/home/jegathees5555/Documents/recruitz/backend/eye_track/haarcascade_eye.xml")
    cascade_classifiers = [
        cv2.CascadeClassifier("/home/jegathees5555/Documents/recruitz/backend/eye_track/haarcascade_eye.xml"),
        cv2.CascadeClassifier("/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/eye_track/haarcascade_frontalface_default.xml")
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
        final_output = (sum(gaze_percentages) / len(gaze_percentages)) * 100 * -1
        print(f"Average Gaze Percentage: {final_output:.2f}")
        return final_output
    else:
        print("No gaze data available.")
        return jsonify({"error": "No gaze data available."})
    # cap = cv2.VideoCapture(video_path)

    # gaze_percentages = []

    # while cap.isOpened():
    #     ret, frame = cap.read()
    #     if not ret:
    #         break

    #     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    #     eyes = eye_detector.detectMultiScale(gray, 1.3, 5)

    #     eye_centers = []
    #     for eye in eyes:
    #         eye_center = (eye[0] + eye[2] // 2, eye[1] + eye[3] // 2)
    #         eye_centers.append(eye_center)

    #     if len(eye_centers) >= 2:
    #         eye_distance = np.linalg.norm(np.array(eye_centers[0]) - np.array(eye_centers[1]))
    #         gaze_percentage = eye_distance / (frame.shape[1] // 2)
    #     else:
    #         gaze_percentage = -1

    #     gaze_percentages.append(gaze_percentage)

    # cap.release()

    # average_gaze = 0
    # if gaze_percentages:
    #     average_gaze = sum(gaze_percentages) / len(gaze_percentages)
    #     final_output = average_gaze
    #     print(f"Average Gaze Percentage: {average_gaze:.2f}")
    #     print(f"{final_output:.2f}")
    #     # return jsonify({"average_gaze": average_gaze, "final_output": final_output})
    #     return final_output 
    # else:
    #     print("No gaze data available.")
    #     return jsonify({"error": "No gaze data available."})

def check_happiness(video_path):
    cap = cv2.VideoCapture(video_path)

    # Check if the camera is opened successfully
    if not cap.isOpened():
        print("Error: Could not open camera.")
        exit()


    total_happiness_percentage = 0
    total_sadness_percentage = 0
    frame_count = 0
    gaze_percentage = eye_tracking_method(video_path)
    while True:
        # Capture a single frame
        ret, frame = cap.read()

        # Break the loop if no more frames are available
        if not ret:
            break

        # Call your eye tracking function on the entire frame
        
        if(gaze_percentage < 0 or gaze_percentage == 100):
            return 1

        # Check if the person is looking (gaze_percentage > threshold, adjust the threshold accordingly)
        if gaze_percentage > 0:
            # Check if the frame is too dark or empty
            if np.mean(frame) < 10:
                happiness_percentage = 1
                sadness_percentage = 99
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
                happiness_percentage, sadness_percentage = classify_emotion(predictions)

                print(f'Happiness Percentage: {happiness_percentage:.2f}%')
                print(f'Sadness Percentage: {sadness_percentage:.2f}%')

                # Accumulate the happiness and sadness percentages
                total_happiness_percentage += happiness_percentage
                total_sadness_percentage += sadness_percentage
                frame_count += 1

    # Release the video capture
    cap.release()

    if frame_count > 0:
        # Calculate the average happiness and sadness percentages
        average_happiness = total_happiness_percentage / frame_count
        average_sadness = total_sadness_percentage / frame_count

        print(f'Average Happiness Percentage: {average_happiness:.2f}%')
        print(f'Average Sadness Percentage: {average_sadness:.2f}%')
        print(gaze_percentage)  # Fix the format specifier here
        average_result = (average_happiness + gaze_percentage) / 2
        print(f'Average Result: {average_result:.2f}')
        return average_result
        # if(gaze_percentage < 0):
        #     return 1
        # else:
        #     return average_result
        # print('average'+(average_happiness+gaze_percentage)/2)
        # return (average_happiness+gaze_percentage)/2
        # Make a decision based on the average happiness
        # if average_happiness > 50:
        #     print("The person is happy on average!")
        # else:
        #     print("The person is not happy on average.")
    else:
        print("No frames available for processing.")
        return 1


if __name__ == "__main__":
    check_happiness('/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/uploaded_video.webm')
