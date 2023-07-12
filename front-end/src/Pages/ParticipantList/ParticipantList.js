// Import Firestore database
import db from "../../firebase";
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ParticipantList.css';
import '../../elements/styles.css';


function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [criteriaScores, setCriteriaScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    getParticipants();
  }, []);

  const getParticipants = () => {
    db.collection('participantList')
      .get()
      .then((querySnapshot) => {
        const participantList = [];
        querySnapshot.forEach((doc) => {
          const participantData = doc.data();
          const participantName = participantData.Name;
          participantList.push(participantName);
        });
        setParticipants(participantList);
      })
      .catch((error) => {
        console.error('Error fetching participants:', error);
      });
  };

  const openEvaluationModal = (participantName) => {
    setSelectedParticipant(participantName);
    setCriteriaScores({});
    setTotalScore(0);
  };

  const handleCheckboxChange = (criterion, score) => {
    setCriteriaScores((prevScores) => ({
      ...prevScores,
      [criterion]: score,
    }));
  };

  useEffect(() => {
    let total = 0;
    Object.values(criteriaScores).forEach((score) => {
      total += parseInt(score);
    });
    setTotalScore(total);
  }, [criteriaScores]);

  const submitEvaluation = () => {
    if (selectedParticipant) {
      db.collection('Analysis')
        .doc(selectedParticipant)
        .set({
          Name: selectedParticipant,
          Scores: criteriaScores,
          TotalScore: totalScore,
        })
        .then(() => {
          alert('Evaluation submitted successfully!');
          setSelectedParticipant('');
        })
        .catch((error) => {
          console.error('Error submitting evaluation:', error);
          alert('Failed to submit evaluation. Please try again.');
        });
    } else {
      alert('Please select a participant.');
    }
  };

  const criteriaOptions = [
    {
      criterion: 'Attract',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Content',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Creativity',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Detail',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Graphic',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Language',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Spelling',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Legibility',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Originality',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    {
      criterion: 'Purpose',
      scores: [
        { label: '5 - Perfect', value: '5' },
        { label: '4 - Good', value: '4' },
        { label: '3 - Fair', value: '3' },
        { label: '2 - Poor', value: '2' },
        { label: '1 - Bad', value: '1' },
      ],
    },
    
  ];

  return (
    <div>
      <h1>Participant Evaluation</h1>
      <div>
        {participants.map((participantName) => (
          <div key={participantName}>
            <span>{participantName}</span>
            <button onClick={() => openEvaluationModal(participantName)}>
              Evaluate
            </button>
          </div>
        ))}
      </div>

      {selectedParticipant && (
        <div>
          <h2>Evaluation</h2>

          <div>
            <h3>Criteria:</h3>
            {criteriaOptions.map(({ criterion, scores }) => (
              <div key={criterion}>
                <h4>{criterion}</h4>
                {scores.map(({ label, value }) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name={criterion}
                      value={value}
                      checked={criteriaScores[criterion] === value}
                      onChange={() => handleCheckboxChange(criterion, value)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            ))}
          </div>

          <div>
            <h3>Total Score: {totalScore}</h3>
          </div>

          <button onClick={submitEvaluation}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default ParticipantList;
