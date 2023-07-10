import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import './Vote.css';

const Vote = () => {
  //setter
  const [candidates, setCandidates] = useState([]);
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  //fetch Fireabase data
  const fetchData = () => {
    db.collection('candidateList')
      .get()
      .then((querySnapshot) => {
        const candidateData = querySnapshot.docs.map((doc) => doc.data());
        setCandidates(candidateData);
        const voteCountsData = candidateData.reduce((counts, candidate) => {
          counts[candidate.Name] = candidate.Count;
          return counts;
        }, {});
        setVoteCounts(voteCountsData);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  };

  //handle change in count based on status of checkbox
  const handleVoteChange = (selectedCandidate) => {
    const updatedVoteCounts = { ...voteCounts, [selectedCandidate.Name]: selectedCandidate.Count };
    setVoteCounts(updatedVoteCounts);
  };

  //work in progress, this will be later connected to Firebase
  const handleSubmitClick = (Count) => {
    
  };

  return (
    <div>
      <center>
        <h2>Candidate List</h2>
      </center>

      {candidates.map((candidate) => (
        <Frame
          key={candidate.Name}
          candidate={candidate}
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

const Frame = ({ candidate, handleVoteChange }) => {
  const[isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(candidate.Count);
  
  //enabled = 1 (count+1)
  //disabled = 0
  const handleCheckboxChange = () => {
    const updatedCount = isChecked ? count - 1 : count + 1;
    setCount(updatedCount);
    setIsChecked(!isChecked);
    handleVoteChange({ ...candidate, Count: updatedCount });
  };

  return (
    <center>
      <div className="container">
        <p>Name: {candidate.Name}</p>
        <p>Title: {candidate.Title}</p>
        <p>Count: {count}</p>
        <label>
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          Vote
        </label>
      </div>
    </center>
  );
};

export default Vote;