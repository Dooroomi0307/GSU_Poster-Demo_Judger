import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import db from '../../firebase';

const criteria = [
  {
    name: 'attract',
    label: 'Attract',
  },
  {
    name: 'content',
    label: 'Content',
  },
  {
    name: 'create',
    label: 'Create',
  },
  {
    name: 'detail',
    label: 'Detail',
  },
  {
    name: 'graphic',
    label: 'Graphic',
  },
  {
    name: 'lang',
    label: 'Lang',
  },
  {
    name: 'legibility',
    label: 'Legibility',
  },
  {
    name: 'origin',
    label: 'Origin',
  },
  {
    name: 'purpose',
    label: 'Purpose',
  },
  {
    name: 'spell',
    label: 'Spell',
  },
];

const scoreOptions = [
  { score: 5, label: 'Excellent' },
  { score: 4, label: 'Good' },
  { score: 3, label: 'Fair' },
  { score: 2, label: 'Poor' },
  { score: 1, label: 'Bad' },
];

function Evaluate() {
  const [scores, setScores] = useState({});
  const [total, setTotalScore] = useState(0);

  useEffect(() => {
    // Fetch the scores from Firebase
    const fetchScores = async () => {
      //participantID should be retrieved from Participant
      try {
        const doc = await db.collection('Analysis').doc('participantId').get();
        const scoresData = doc.data();

        if (scoresData) {
          setScores(scoresData);
          setTotalScore(scoresData.total || 0);
        }
      } catch (error) {
        console.error('Error fetching scores from Firebase:', error);
      }
    };

    fetchScores();
  }, []);

  useEffect(() => {
    // Calculate the total score whenever any individual score changes
    const calculateTotalScore = () => {
      const sum = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
      setTotalScore(sum);
    };

    calculateTotalScore();
  }, [scores]);

  const updateScore = (criteriaName, score) => {
    setScores((prevScores) => ({
      ...prevScores,
      [criteriaName]: score,
    }));
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const participantId = queryParams.get('participantId');

  const saveScores = () => {
    const updatedScores = { ...scores };

    //participantID should be unique ID that passed from Participant List
    db.collection('Analysis')
      .doc('participantId')
      .set(updatedScores)
      .then(() => {
        console.log('Scores saved to Firebase!');
      })
      .catch((error) => {
        console.error('Error saving scores to Firebase:', error);
      });

    db.collection('Analysis')
      .doc('participantId')
      .update({ total })
      .then(() => {
        console.log('Total score saved to Firebase!');
      })
      .catch((error) => {
        console.error('Error saving total score to Firebase:', error);
      });
  };

  return (
    <div>
      <h2>Evaluation Page</h2>
      <div>
        <h3>Criteria</h3>
        {criteria.map((criterion) => (
          <div key={criterion.name}>
            <label>
              {criterion.label}:
              {scoreOptions.map((option) => (
                <label key={option.score}>
                  <input
                    type="checkbox"
                    checked={scores[criterion.name] === option.score}
                    onChange={() =>
                      updateScore(
                        criterion.name,
                        scores[criterion.name] === option.score ? 0 : option.score
                      )
                    }
                  />
                  {option.score} - {option.label}
                </label>
              ))}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h3>Total Score: {total}</h3>
      </div>
      <button onClick={saveScores}>Submit</button>
    </div>
  );
}

export default Evaluate;