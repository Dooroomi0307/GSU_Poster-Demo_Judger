// Import Firestore database
import db from "../../firebase";
import { useState } from 'react';
import './Analysis.css';
 
const Analysis = () => {
 
  const [info, setInfo] = useState([]);

  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener('load', () => {
      Fetchdata();
  });

  // Fetch the required data using the get() method
  const Fetchdata = () => {
      db.collection("Analysis").get().then((querySnapshot) => {

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
              <h2>Analysis</h2>
              
          </center>

          {
              info.map((data) => (
                  <Frame 
                      /*
                      title={data.Title}
                      name={data.Name}
                      lvl={data.Lvl}
                      category={data.Category}
                      */
                      name={data.Name}
                      pID={data.participantID}
                      attract={data.attractScore}
                      content={data.contentScore}
                      create={data.createScore}
                      detail={data.detailScore}
                      graphic={data.graphicScore}
                      lang={data.langScore}
                      legib={data.legibilityScore}
                      origin={data.originScore}
                      purpose={data.purposeScore}
                      spell={data.spellScore}
                      total={data.totalScore} />
              ))
          }
      </div>

  );
}

// Define how each display entry will be structured
const Frame = ({ name, pID, attract, content, create, detail, graphic, lang, legib, origin, purpose, spell, total }) => {
  console.log(name + " " + pID + " " + attract + " " + content + " " + create + " " + detail + " " + graphic + " " + lang + " " + legib + " " 
                        + origin + " " + purpose + " "+ spell + " " + total + "\n");
  return (
      <center>
          <div className="container">
            <p>Name : {name}</p> 
            <p>Attractiveness Score: {attract}</p>
            <p>Content Score: {content}</p>    
            <p>Creativity Score: {create}</p>
            <p>Details Score: {detail}</p> 
            <p>Graphics Score: {graphic}</p>
            <p>Language Score: {lang}</p>
            <p>Legibility Score: {legib}</p>
            <p>Originality Score: {origin}</p>
            <p>Purpose Score: {purpose}</p>
            <p>Spelling Score: {spell}</p>
            <p>Total Project Score : {total}</p>       

          </div>
      </center>
  );
}

/*
  function Analysis(){
  //Alex
  //Use case8: Admin view; see analysis of score
  return <h1>Analysis</h1>
}
*/

export default Analysis;