// Import Firestore database
import db from "../../firebase";
import { useState, useEffect } from 'react';
import './ParticipantList.css';

const ParticipantList = () => {
  // Participant list state
  const [info, setInfo] = useState([]);

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


  // Render the participant list table view
  return (
    <div>
      <center>
        <h2>Participant List</h2>
      </center>
      <table className="participant-table">
        <thead>
          <tr>
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define how each row will be structured
const ParticipantRow = ({ data }) => {
  const { id, Name, Lvl, Title, Category } = data;

  return (
    <tr>
      <td>{Name}</td>
      <td>{Lvl}</td>
      <td>{Title}</td>
      <td>{Category}</td>
      <td>
        <button>View</button>
      </td>
    </tr>
  );
};

export default ParticipantList;
