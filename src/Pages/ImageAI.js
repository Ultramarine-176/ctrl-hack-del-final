import React, { useState } from 'react';
import axios from 'axios';
import './ImageAI.css';
import ReactMarkdown from 'react-markdown';

const ImageAI = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await axios.post('http://localhost:8000/analyze-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setAnalysisResult(response.data.analysis);
  };

  return (
    <div>
      <h1>Medical Image Analysis</h1>
      <section>
        <h2>How it Works</h2>
        <p>
          This tool helps provide analysis for medical images, such as skin conditions, rashes, and other visible symptoms. 
          By leveraging advanced AI technology, the system can identify potential conditions and offer informational insights based on 
          the uploaded image. Simply upload a clear image of the affected area, and click "Analyze Image" to receive an assessment.
          <br /><br />
          **Note**: This tool is for informational purposes only and is not a substitute for professional medical advice. Always consult 
          a healthcare provider for a comprehensive diagnosis and treatment.
        </p>
      </section>
      
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
        <button type="submit">Analyze Image</button>
      </form>
      
      {analysisResult && (
        <div className="response-container">
          <h2>Analysis Result:</h2>
          <ReactMarkdown>{analysisResult}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ImageAI;
