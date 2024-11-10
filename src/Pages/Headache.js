import React from 'react';
import './Headache.css';
import headacheImage from './headache.jpg';

const Headache = () => {
  return (
    <div className="headache-container">
      <h1 className="headache-title">Headache</h1>

      <img src={headacheImage} alt="Headache illustration" className="headache-image" />

      <section className="headache-section">
        <h2 className="headache-subtitle">Common Causes</h2>
        <ul className="headache-list">
          <li>Stress and tension</li>
          <li>Dehydration</li>
          <li>Lack of sleep or poor sleep quality</li>
          <li>Eye strain from digital screens</li>
          <li>Poor posture</li>
          <li>Skipping meals</li>
          <li>Caffeine withdrawal</li>
          <li>Sinus problems</li>
          <li>Bright lights or loud noises</li>
          <li>Certain foods or food additives</li>
        </ul>

        <h2 className="headache-subtitle">Remedies</h2>
        <ul className="headache-list">
          <li>Stay hydrated - drink plenty of water</li>
          <li>Take over-the-counter pain relievers as directed</li>
          <li>Rest in a quiet, dark room</li>
          <li>Apply a cold or warm compress to your head/neck</li>
          <li>Practice relaxation techniques or meditation</li>
          <li>Maintain regular sleep schedule</li>
          <li>Take regular breaks from screens</li>
          <li>Practice good posture</li>
          <li>Get regular exercise</li>
          <li>Keep a headache diary to identify triggers</li>
        </ul>
      </section>
    </div>
  );
};

export default Headache;
