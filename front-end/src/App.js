import firebase from 'firebase/app';
import './elements/App.css'
<<<<<<< HEAD
import Navbar from "./elements/Navbar.js"
import Home from "./Pages/Home.js"
import Login from "./Pages/Login/Login.jsx"
import ParticipantList from "./Pages/ParticipantList/ParticipantList.js"
import Evaluate from "./Pages/Evaluate/Evaluate.js"
import Analysis from "./Pages/Analysis/Analysis.js"
import Vote from "./Pages/Vote/Vote.js"
import { Route, Routes } from "react-router-dom"

function App() {
 
=======
import db from "./firebase"
import { useState, useEffect } from 'react'
import Navbar from "./elements/Navbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login/Login"
import ParticipantList from "./Pages/ParticipantList/ParticipantList"
import Evaluate from "./Pages/Evaluate/Evaluate"
import Analysis from "./Pages/Analysis/Analysis"
import Vote from "./Pages/Vote/Vote"
import Evaluation from './Pages/Evaluate/Evaluation';
import { Route, Routes, Router} from "react-router-dom"

function App() {

  const [selectedParticipant, setSelectedParticipant] = useState('');

  const openEvaluationModal = (participantName) => {
    setSelectedParticipant(participantName);
  };

  const submitEvaluation = (participant, score) => {
    db.collection('Analysis')
      .doc(participant)
      .set({
        Score: score,
      })
      .then(() => {
        alert('Evaluation submitted successfully!');
        setSelectedParticipant('');
      })
      .catch((error) => {
        console.error('Error submitting evaluation:', error);
        alert('Failed to submit evaluation. Please try again.');
      });
  };

    
  

>>>>>>> c86f8b5a49a305741007353c8d94febb4f3bab4e
  //use capital letter for component name
  return(
    <>
    <Navbar />
    <div className="container">
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/participantList" element={<ParticipantList />}/>
        <Route path="/evaluate" element={<Evaluate />}/>
        <Route path="/analysis" element={<Analysis />}/>
        <Route path="/vote" element={<Vote />}/>
        <Route exact path="/evaluate/:participantId" component={Evaluation} />
      </Routes>
   

    </div>
    </>
  )

    
}

export default App;