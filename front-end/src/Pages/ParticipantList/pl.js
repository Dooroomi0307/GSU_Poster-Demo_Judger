import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../firebase';
import './ParticipantList.css';
import './ParticipantRegi.css';

function PL() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getParticipants();
  }, []);

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

  

  //Search Participant by ParticiapantID
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredParticipants = participants.filter((participant) => {
    return participant.participantID.includes(searchTerm);
  });
  //Criteria label
 

  return (
    <div>
      <h1>Participant Evaluation</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Participant ID"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

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
          {filteredParticipants.map((participant) => (
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

    
    </div>
  );
}

export default PL;
