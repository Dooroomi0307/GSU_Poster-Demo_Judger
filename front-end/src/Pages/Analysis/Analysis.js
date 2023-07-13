import db from "../../firebase";
import { useState } from 'react';
import './Analysis.css';
 
const Analysis = () => {
  const [info, setInfo] = useState([]);
  
  //Page load
  window.addEventListener('load', () => {
      Fetchdata();
  });

  // Fetch Firebase
  const Fetchdata = () => {
      db.collection("Analysis").get().then((querySnapshot) => {
          querySnapshot.forEach(element => {
            var data = element.data();
            setInfo(arr => [...arr, data]);

          });
      })
  }
 
  //Analysis page data mapping
  return (
      <div>
          <center>
              <h2>Analysis</h2>
          </center>
          {
              info.map((data) => (
                  <Frame 
                      name={data.Name}
                      pID={data.ParticipantID}
                      attract={data.Attract}
                      content={data.Content}
                      create={data.Creativity}
                      detail={data.Detail}
                      graphic={data.Graphic}
                      lang={data.Language}
                      spell={data.Spelling}
                      legib={data.Legibility}
                      origin={data.Originality}
                      purpose={data.Purpose}
                      total={data.TotalScore} />
              ))
          }
      </div>
  );
}

//Analysis page layout
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
            <p>Spelling Score: {spell}</p>
            <p>Legibility Score: {legib}</p>
            <p>Originality Score: {origin}</p>
            <p>Purpose Score: {purpose}</p>
            <p>Total Project Score : {total}</p>       

          </div>
      </center>
  );
}

export default Analysis;