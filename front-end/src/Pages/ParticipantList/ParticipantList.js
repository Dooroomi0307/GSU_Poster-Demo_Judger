// Import Firestore database
import db from "../../firebase.js";
import { useState } from 'react';
import './ParticipantList.css';
 
const ParticipantList = () => {
 
  const [info, setInfo] = useState([]);

  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener('load', () => {
      Fetchdata();
  });

  // Fetch the required data using the get() method
  const Fetchdata = () => {
      db.collection("participantList").get().then((querySnapshot) => {

          // Loop through the data and store
          // it in array to display
          querySnapshot.forEach(element => {
              var data = element.data();
              setInfo(arr => [...arr, data]);

          });
      })
  }
  //Name, Title, Level of Study, Category
  // Display the result on the page
  return (
      <div>
          <center>
              <h2>Participant List</h2>
              
          </center>

          {
              info.map((data) => (
                  <Frame title={data.Title}
                      name={data.Name}
                      lvl={data.Lvl}
                      category={data.Category} />
              ))
          }
      </div>

  );
}

// Define how each display entry will be structured
const Frame = ({ title, name, lvl, category }) => {
  console.log(title + " " + name + " " + lvl + " " + category+"\n");
  return (
      <center>
          <div className="container">
            <p>Name : {name}</p> 
            
            <p>Title : {title}</p>

            <p>Level of Study : {lvl}</p>    

            <p>Category : {category}</p>

          </div>
      </center>
  );
}

export default ParticipantList;