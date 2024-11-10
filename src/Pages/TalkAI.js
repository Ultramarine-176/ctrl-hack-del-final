import React, { useState } from 'react';
import axios from 'axios';
import { ReactMediaRecorder } from 'react-media-recorder';
import './TalkAI.css';

const TalkAI = () => {
  const [transcription, setTranscription] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleAudioStop = async (blobUrl) => {
    try {
      const response = await fetch(blobUrl);
      const audioBlob = await response.blob();
      const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });

      const formData = new FormData();
      formData.append('file', audioFile);

      const { data } = await axios.post('http://localhost:8001/analyze-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTranscription(data.transcription);
      setAiResponse(data.ai_response);
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      alert('An error occurred while analyzing the audio. Check console for details.');
    }
  };

  return (
    <div className="container">
      <h1>Talk to an Medical AI</h1>
      <div className="prompt-section">
        <h2>Common Medical Prompts</h2>
        <ul>
            <li>What are some common symptoms of a cold?</li>
          <li>How to manage a mild fever?</li>
              <li>What causes persistent headaches?</li>
          <li>Steps to take for a minor cut or bruise</li>
          <li>How to relieve stress and anxiety symptoms?</li>
        </ul>
      </div>
         <p>Click to record your message and get a response.</p>
      
      <ReactMediaRecorder
        audio
        onStop={handleAudioStop}  
        render={({ status, startRecording, stopRecording }) => (
          <div>
            <p>Status: {status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
          </div>
        )}
      />
      
      {transcription && (
        <div className="response-container">
          <h2>Transcription</h2>
          <p>{transcription}</p>
        </div>
      )}
      
      {aiResponse && (
        <div className="response-container">
          <h2>AI Medical Response</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default TalkAI;

