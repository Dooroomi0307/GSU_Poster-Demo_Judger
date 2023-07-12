// Import Firestore database
import db from "../../firebase";
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ParticipantList.css';

const ParticipantList = () => {
  // Participant list state
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  // Start the fetch operation as soon as
  // the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch the required data using the get() method
  const fetchData = () => {
    db.collection("participantList").get().then((querySnapshot) => {
      const participantData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        participantData.push(data);
      });
      setInfo(participantData);
    });
  };

  const handleEvaluateClick = (participantID) => {
    navigate('/Evaluate/Evaluate.js${participantID}');
  };

  // Render the participant list table view
  return (
    <div>
      <center>
        <h2>Participant List</h2>
      </center>
      <table className="participant-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Level of Study</th>
            <th>Title</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {info.map((data) => (
            <ParticipantRow
              key={data.id} 
              data={data}
              onEvaluate = {handleEvaluateClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};


// Define how each row will be structured
const ParticipantRow = ({ data, onEvaluate }) => {
  const { id, participantID, Name, Lvl, Title, Category } = data;

  return (
    <tr>
      <td>{participantID}</td>
      <td>{Name}</td>
      <td>{Lvl}</td>
      <td>{Title}</td>
      <td>{Category}</td>
      <td>
        <button onClick={() => onEvaluate(participantID)}>Evaluate</button>
      </td>
    </tr>
  );
};

export default ParticipantList;
