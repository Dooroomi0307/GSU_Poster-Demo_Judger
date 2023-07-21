import React, { useState, useEffect } from 'react';
import db from "../../firebase";
import './Analysis.css';

const Analysis = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Firebase
  const fetchData = () => {
    db.collection("Analysis")
      .get()
      .then((querySnapshot) => {
        const analysisData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          analysisData.push(data);
        });
        const sortedData = analysisData.sort((a, b) => b.TotalScore - a.TotalScore); // Sort by TotalScore in descending order
        setInfo(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching analysis data:', error);
      });
  };

  // Handle checkbox selection
  const handleCheckboxChange = (index) => {
    const updatedInfo = [...info];
    updatedInfo[index].isSelected = !updatedInfo[index].isSelected;
    setInfo(updatedInfo);
  };

  // Save selected participants as candidates in 'Vote' collection
  const saveCandidates = () => {
    const selectedParticipants = info.filter((data) => data.isSelected);
    selectedParticipants.forEach((participant) => {
      db.collection("Vote")
        .add({
          Name: participant.Name,
          ParticipantID: participant.ParticipantID,
          ProjectTitle: participant.ProjectTitle,
          ProjectCategory: participant.ProjectCategory,
          Count: 0
        })
        .then(() => {
          alert('Candidate information has been submitted.')
          console.log('Participant saved as a candidate');
        })
        .catch((error) => {
          console.error('Error saving participant as a candidate:', error);
        });
    });
  };

  return (
    <div>
      <center>
        <h2>Analysis</h2>
      </center>
      <div className="table-container">
        
        <table className="analysis-table">
          
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>ParticipantID</th>
              <th>Project Title</th>
              <th>Category</th>
              <th>Attractiveness</th>
              <th>Content</th>
              <th>Creativity</th>
              <th>Detail</th>
              <th>Graphics</th>
              <th>Language</th>
              <th>Spelling</th>
              <th>Legibility</th>
              <th>Originality</th>
              <th>Purpose</th>
              <th>Total</th>
            </tr>
          </thead>
          
          <tbody>
            {info.map((data, index) => (
              <TableRow
                key={index}
                data={data}
                index={index}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </tbody>
            <div className="button-container">
              <button className="set-button" onClick={saveCandidates}>Set as Candidate</button>
            </div>   
        </table>
      </div>

      

           
    </div>
  );
};

const TableRow = ({ data, index, handleCheckboxChange }) => {
  const {
    Name,
    ParticipantID,
    ProjectTitle,
    ProjectCategory,
    Attract,
    Content,
    Creativity,
    Detail,
    Graphic,
    Language,
    Spelling,
    Legibility,
    Originality,
    Purpose,
    TotalScore,
    isSelected,
  } = data;

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleCheckboxChange(index)}
        />
      </td>
      <td>{Name}</td>
      <td>{ParticipantID}</td>
      <td>{ProjectTitle}</td>
      <td>{ProjectCategory}</td>
      <td>{Attract}</td>
      <td>{Content}</td>
      <td>{Creativity}</td>
      <td>{Detail}</td>
      <td>{Graphic}</td>
      <td>{Language}</td>
      <td>{Spelling}</td>
      <td>{Legibility}</td>
      <td>{Originality}</td>
      <td>{Purpose}</td>
      <td>{TotalScore}</td>
    </tr>

    
  );
};

export default Analysis;
