import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../firebase';
import './ParticipantList.css';

function ParticipantList() {
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

      <div>
        <button onClick={openAddParticipantWindow}>Add Participant</button>
      </div>
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


//Add participant pop-up window
const openAddParticipantWindow = () => {
  const addParticipantWindow = window.open('', '_blank', 'width=500,height=500');
  addParticipantWindow.document.title = 'Add Participant';

  ReactDOM.render(<AddParticipantForm onClose={addParticipantWindow.close} />, addParticipantWindow.document.body);
};

//Add participant content
function AddParticipantForm({ onClose }) {
  const [newParticipant, setNewParticipant] = useState({
    participantID: '',
    name: '',
    levelOfStudy: 'Undergraduate',
    projectTitle: '',
    category: 'Demo',
  });

  //Add participant input handle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant((prevParticipant) => ({
      ...prevParticipant,
      [name]: value,
    }));
  };

  //Store new participant's info into 'ParticipantList' collection
  const addParticipant = () => {
    const { participantID, name, levelOfStudy, projectTitle, category } = newParticipant;
    if (participantID.trim() !== '' && name.trim() !== '' && levelOfStudy.trim() !== '' && projectTitle.trim() !== '' && category.trim() !== '') {
      db.collection('ParticipantList')
        .doc()
        .set({
          Name: name,
          ParticipantID: participantID,
          Lvl: levelOfStudy,
          Title: projectTitle,
          Category: category,
        })
        .then(() => {
          alert('Participant information has been saved.');
          onClose(); 
        })
        .catch((error) => {
          console.error('Error adding participant:', error);
          alert('Failed to add participant. Please try again.');
        });
    } else {
      alert('Please fill in all the fields.');
    }
  };

  //Add participant layout
  return (
    <div>
      <h2>Participant Registration</h2>
      <div className="participant-form">
        <label>Participant ID:</label>
        <input type="text" name="participantID" value={newParticipant.participantID} onChange={handleInputChange} />

        <label>Name:</label>
        <input type="text" name="name" value={newParticipant.name} onChange={handleInputChange} />

        <label>Level of Study:</label>
        <select name="levelOfStudy" value={newParticipant.levelOfStudy} onChange={handleInputChange}>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Masters or Pre-qualifier Doctoral Student">Masters or Pre-qualifier Doctoral Student</option>
          <option value="Doctoral Student - Post-qualifier">Doctoral Student - Post-qualifier</option>
        </select>

        <label>Project Title:</label>
        <input type="text" name="projectTitle" value={newParticipant.projectTitle} onChange={handleInputChange} />

        <label>Category:</label>
        <select name="category" value={newParticipant.category} onChange={handleInputChange}>
          <option value="Demo">Demo</option>
          <option value="Poster">Poster</option>
        </select>

        <button onClick={addParticipant}>Save</button>
      </div>
    </div>
  );
}

export default ParticipantList;
