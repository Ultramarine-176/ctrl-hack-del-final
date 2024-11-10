import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from api_key import openai_api_key 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def transcribe_audio(audio_path):
    try:
        with open(audio_path, "rb") as audio_file:
            headers = {
                "Authorization": f"Bearer {openai_api_key}"
            }
            files = {
                "file": audio_file,
            }
            data = {
                "model": "whisper-1"
            }
            response = requests.post("https://api.openai.com/v1/audio/transcriptions", headers=headers, files=files, data=data)
            response.raise_for_status()
            transcript = response.json()
        return transcript["text"]
    except requests.exceptions.RequestException as e:
        print("Transcription Error:", e)
        raise HTTPException(status_code=500, detail="Transcription failed.")

async def fetch_ai_response(input_text):
    try:
        headers = {
            "Authorization": f"Bearer {openai_api_key}",
            "Content-Type": "application/json",
        }
        json_data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": input_text}],
        }
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=json_data)
        response.raise_for_status()
        ai_response = response.json()
        return ai_response["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        print("AI Response Error:", e)
        raise HTTPException(status_code=500, detail="AI response generation failed.")

@app.post("/analyze-audio")
async def analyze_audio(file: UploadFile = File(...)):
    audio_path = "temp_audio.wav"
    try:
        with open(audio_path, "wb") as audio_file:
            audio_file.write(await file.read())
    except Exception as e:
        print("File Saving Error:", e)
        raise HTTPException(status_code=500, detail="Failed to save the uploaded audio file.")

    transcribed_text = await transcribe_audio(audio_path)
    ai_response = await fetch_ai_response(transcribed_text)

    return {"transcription": transcribed_text, "ai_response": ai_response}

if __name__ == "__main__":
    uvicorn.run("backend1:app", host="0.0.0.0", port=8001)
