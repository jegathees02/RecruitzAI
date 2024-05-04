import speech_recognition as sr

def audio_to_text(audio_file_path):
    recognizer = sr.Recognizer()

    try:
        with sr.AudioFile(audio_file_path) as audio_file:
            audio_data = recognizer.record(audio_file)

            # Use the Google Web Speech API for recognition
            text = recognizer.recognize_google(audio_data, language='en-US')

            return text

    except sr.UnknownValueError:
        print("Google Web Speech API could not understand audio")
        return None
    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")
        return None

if __name__ == "__main__":
    audio_file_path = "/home/jegathees5555/Documents/projects/AI_Interview_recruitz/backend/server/output.wav"  # Change this to the path of your audio file
    result = audio_to_text(audio_file_path)

    if result:
        print("Text from audio:")
        print(result)
