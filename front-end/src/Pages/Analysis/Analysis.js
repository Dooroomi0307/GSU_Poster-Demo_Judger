import db from "../../firebase";
import { useState, useEffect } from 'react';
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
        setInfo(analysisData);
      })
      .catch((error) => {
        console.error('Error fetching analysis data:', error);
      });
  };

  //Analysis page data mapping
  return (
    <div>
      <center>
        <h2>Analysis</h2>
      </center>
      <table className="analysis-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ParticipantID</th>
            <th>Attractiveness</th>
            <th>Content</th>
            <th>Creativity</th>
            <th>Details</th>
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
            <TableRow key={index} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

//Analysis table row
const TableRow = ({ data }) => {
  const {
    Name,
    ParticipantID,
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
  } = data;

  return (
    <tr>
      <td>{Name}</td>
      <td>{ParticipantID}</td>
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
