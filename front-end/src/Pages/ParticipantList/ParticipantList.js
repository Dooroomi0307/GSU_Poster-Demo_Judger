import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../firebase';
import './ParticipantList.css';
import './ParticipantRegi.css';

//Participant List Admin Side
function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  
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
             
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={openAddParticipantWindow}>Add Participant</button>
      </div>
     
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
  //Temporarily combined with ParticipantRegi.css 
  return (
    <div>
      <h2>Participant Registration</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <label style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Participant ID:</label>
        <input type="text" name="participantID" value={newParticipant.participantID} onChange={handleInputChange} style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', boxSizing: 'border-box' }} />
  
        <label style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Name:</label>
        <input type="text" name="name" value={newParticipant.name} onChange={handleInputChange} style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', boxSizing: 'border-box' }} />
  
        <label style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Level of Study:</label>
        <select name="levelOfStudy" value={newParticipant.levelOfStudy} onChange={handleInputChange} style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Masters or Pre-qualifier Doctoral Student">Masters or Pre-qualifier Doctoral Student</option>
          <option value="Doctoral Student - Post-qualifier">Doctoral Student - Post-qualifier</option>
        </select>
  
        <label style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Project Title:</label>
        <input type="text" name="projectTitle" value={newParticipant.projectTitle} onChange={handleInputChange} style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', boxSizing: 'border-box' }} />
  
        <label style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Category:</label>
        <select name="category" value={newParticipant.category} onChange={handleInputChange} style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}>
          <option value="Demo">Demo</option>
          <option value="Poster">Poster</option>
        </select>
  
        <button onClick={addParticipant} style={{ padding: '0.5rem 1rem' }}>Save</button>
      </div>
    </div>
  );
}

export default ParticipantList;