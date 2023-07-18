import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import './Vote.css';

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  //Firebase fetch
  const fetchData = () => {
    db.collection('Vote')
      .get()
      .then((querySnapshot) => {
        const candidateData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        setCandidates(candidateData);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  };

  const handleVoteChange = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  //Handle submit button for voting
  const handleSubmitClick = () => {
    if (selectedCandidate) {
      const selectedCandidateRef = db.collection('Vote').doc(selectedCandidate);
      selectedCandidateRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            const currentCount = docSnapshot.data().Count;
            const updatedCount = currentCount + 1;
            selectedCandidateRef.update({ Count: updatedCount })
              .then(() => {
                alert('Vote has been recorded.')
                console.log('Count updated successfully');
              })
              .catch((error) => {
                console.error('Error updating count:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error retrieving candidate:', error);
        });
    }
  };

  //Page layout
  return (
    <div>
   <center>
        <h2>Candidate List</h2>
        </center>

      {candidates.map((candidate) => (
        <Frame
          key={candidate.id}
          candidate={candidate}
          selectedCandidate={selectedCandidate}
          handleVoteChange={handleVoteChange}
        />
      ))}

      <div className="submit-button-container">
        <button className="submit-button" onClick={handleSubmitClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

//Vote page main content
const Frame = ({ candidate, selectedCandidate, handleVoteChange }) => {
  const handleCheckboxChange = () => {
    handleVoteChange(candidate.id);
  };

//Vote page layout
  return (
    <center>
      <div className="container">
        <p>ParticipantID: {candidate.ParticipantID}</p>
        <p>Name: {candidate.Name}</p>
        <p>Title: {candidate.ProjectTitle}</p>
        <p>Category: {candidate.ProjectCategory}</p>
        <p>Count: {candidate.Count}</p>
        <label>
          <input
            type="checkbox"
            checked={candidate.id === selectedCandidate}
            onChange={handleCheckboxChange}
          />
          Vote
        </label>
      </div>
    </center>
  );
};

export default Vote;
