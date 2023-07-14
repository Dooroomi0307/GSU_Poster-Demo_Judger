import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../firebase';
import './ParticipantList.css';
import './ParticipantRegi.css';

function PartList() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [criteriaScores, setCriteriaScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    getParticipants();
  }, []);

  //Firebase fetch
  const getParticipants = () => {
    db.collection('ParticipantList')
      .get()
      .then((querySnapshot) => {
        const participantList = [];
        querySnapshot.forEach((doc) => {
          const participantData = doc.data();
          const participantID = participantData.ParticipantID;
          const participantName = participantData.Name;
          const levelOfStudy = participantData.Lvl;
          const projectTitle = participantData.Title;
          const category = participantData.Category;
          participantList.push({
            participantID,
            participantName,
            levelOfStudy,
            projectTitle,
            category,
          });
        });
        setParticipants(participantList);
      })
      .catch((error) => {
        console.error('Error fetching participants:', error);
      });
  };

  //Evaluation modal
  //pass participantName to store the evaluation score
  const openEvaluationModal = (participantName) => {
    setSelectedParticipant(participantName);
    setCriteriaScores({});
    setTotalScore(0);
  };

  //Checkbox handle for each score
  const handleCheckboxChange = (criterion, score) => {
    setCriteriaScores((prevScores) => ({
      ...prevScores,
      [criterion]: score,
    }));
  };

  //Store score for each criteria & sum up total score
  useEffect(() => {
    let total = 0;
    Object.values(criteriaScores).forEach((score) => {
      total += parseInt(score);
    });
    setTotalScore(total);
  }, [criteriaScores]);

  //Store evaluation into 'Analysis' collection
  const submitEvaluation = () => {
    //retrieve selected participant's participant ID
    const participant = participants.find((participant) => participant.participantName === selectedParticipant);
    const participantID = participant ? participant.participantID : '';
    if (selectedParticipant) {
      db.collection('Analysis')
        .doc()
        .set({
          Name: selectedParticipant,
          ParticipantID: participantID,
          ...criteriaScores,
          TotalScore: totalScore,
        })
        .then(() => {
          alert('Evaluation has been submitted.');
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

  //Criteria label
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
    }
  ];

  //Participant list  & Evaluation modal 
  return (
    <div>
      <h1>Participant Evaluation</h1>

      <table className="participant-table">
        <thead>
          <tr>
            <th>Participant ID</th>
            <th>Name</th>
            <th>Level of Study</th>
            <th>Project Title</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.participantID}>
              <td>{participant.participantID}</td>
              <td>{participant.participantName}</td>
              <td>{participant.levelOfStudy}</td>
              <td>{participant.projectTitle}</td>
              <td>{participant.category}</td>
              <td>
                <button onClick={() => openEvaluationModal(participant.participantName)}>Evaluate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {selectedParticipant && (
        <div>
          <h2>Evaluation</h2>
          <div className="evaluation-criteria">
            {criteriaOptions.map(({ criterion, scores }) => (
              <div key={criterion} className="criterion-box">
                <h4>{criterion}</h4>
                {scores.map(({ label, value }) => (
                  <label key={value} className="score-option">
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

export default PartList;

