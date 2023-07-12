import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import db from '../../firebase';

function Evaluate({ participant, onSubmit }) {
  const [score, setScore] = useState('');

  const submitEvaluation = () => {
    if (score !== '') {
      onSubmit(participant, parseInt(score));
      setScore('');
    } else {
      alert('Please enter a score.');
    }
  };

  return (
    <div>
      <h1>Evaluation</h1>
      <h2>Participant: {participant}</h2>
      <label htmlFor="score">Score:</label>
      <input
        type="number"
        id="score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <button onClick={submitEvaluation}>Submit</button>
    </div>
  );
}

export default Evaluate;