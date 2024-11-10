import React from 'react';
import './Home.css';
import homeImage from './HomeLargePicture.jpg';

const Home = () => {
  const urls = [
    { url: '/headache', label: 'Headache' },
    { url: 'https://www.example.com/page2', label: 'Fever' },
    { url: 'https://www.example.com/page3', label: 'Fatigue' },
    { url: 'https://www.example.com/page4', label: 'Rash' },
    { url: 'https://www.example.com/page5', label: 'Diarrhea' },
  ];

  return (
    <div className="home-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${homeImage})`,
        }}
      />
      <h1 className="title">What We Do!</h1>
      <div>
        <p className="description">
          Let AI be your doctor
          <br />
          <br />
          Our AI Diagnosis Web Tool is an advanced online platform designed to assist
          users in identifying potential health conditions by analyzing their symptoms
          and other relevant data inputs using artificial intelligence.
          This tool is intended to complement healthcare services by offering reliable
          recommendations, highlighting possible diagnoses, and suggesting next steps,
          such as seeking a healthcare professional for further evaluation.
          With a user-friendly interface, it empowers individuals with fast, secure,
          and confidential access to health-related guidance, enhancing accessibility
          to medical insights while reducing unnecessary anxiety or visits.
          This web-based tool serves as an essential resource for both patients and
          clinicians by streamlining health assessments and supporting informed decision-making.
        </p>
      </div>
      <h1 className="common-symptoms-title">Common Symptoms</h1>
      <div className="symptoms-container">
        {urls.map((url, index) => (
          <div
            key={index}
            onClick={() => (window.location.href = url.url)}
            className="symptom-box"
          >
            <span className="symptom-text">{url.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
