import uvicorn
from fastapi import FastAPI, File, UploadFile
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

from api_key import api_key

genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro-latest",
    generation_config=generation_config,
    safety_settings=safety_settings
)

system_prompt = """
You are a very skilled doctor. You are tasked with checking medical images for a hospital. You are expert in identify any diseases or health issues that are present in the image.

Your responsibilities include:

1. Detailed Analysis: Carefully analyze each image, focus on identifying any diseases. 
2. Finding Report: Document all observed disease, clearly put them in a structured format.
3. Recommendation: based on your analysis, suggest couple of next steps for the patient.
4. Treatment Suggestion: recommend possible treatment for the patient.
"""

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    image_data = await file.read()
    image_parts = [
        {
            "mime_type": file.content_type,
            "data": image_data
        },
    ]

    prompt_parts = [
        image_parts[0],
        system_prompt,
    ]
    response = model.generate_content(prompt_parts)
    return {"analysis": response.text}
if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=8000)
