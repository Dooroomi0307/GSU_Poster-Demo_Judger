import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../firebase';
import './Candidate.css';

//Candidate List; 
function CandidateList() {
  const [candidates, setcandidates] = useState([]);

  useEffect(() => {
    getcandidates();
  }, []);

  // Firebase fetch
  const getcandidates = () => {
    db.collection('Vote')
      .get()
      .then((querySnapshot) => {
        const candidateList = [];
        querySnapshot.forEach((doc) => {
          const CandidateData = doc.data();
          const candidateID = CandidateData.ParticipantID;
          const candidateName = CandidateData.Name;
          const projectTitle = CandidateData.ProjectTitle;
          const category = CandidateData.ProjectCategory;
          candidateList.push({
            id: doc.id, // Add the unique id of the candidate document from Firebase
            candidateID,
            candidateName,
            projectTitle,
            category,
          });
        });
        setcandidates(candidateList);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  };

  // Delete a candidate by id
  const deleteCandidate = (id) => {
    db.collection('Vote')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Candidate deleted successfully!');
        // Update the state to remove the deleted candidate from the list
        setcandidates(candidates.filter((candidate) => candidate.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting candidate:', error);
      });
  };

  return (
    <div>
      <h1>Candidate List</h1>
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Participant ID</th>
            <th>Name</th>
            <th>Project Title</th>
            <th>Category</th>
            <th>Actions</th> {/* Add a new column for the "Delete" button */}
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.candidateID}</td>
              <td>{candidate.candidateName}</td>
              <td>{candidate.projectTitle}</td>
              <td>{candidate.category}</td>
              <td>
                <button onClick={() => deleteCandidate(candidate.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateList;
