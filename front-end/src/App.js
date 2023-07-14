import firebase from 'firebase/app';
import './elements/App.css'
import Navbar from "./elements/Navbar.js"
import Home from "./Pages/Home.js"
import Login from "./Pages/Login/Login.jsx"
import ParticipantList from "./Pages/ParticipantList/ParticipantList.js"
import Evaluate from "./Pages/Evaluate/Evaluate.js"
import Analysis from "./Pages/Analysis/Analysis.js"
import Vote from "./Pages/Vote/Vote.js"
import { Route, Routes } from "react-router-dom"

function App() {


  //use capital letter for component name
  //removed Navbar; if you want to display navbar put <Navbar /> before <div className="container">
  return(
    <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="" element={<Login />}/>
        <Route path="/participantList" element={<ParticipantList />}/>
        <Route path="/analysis" element={<Analysis />}/>
        <Route path="/vote" element={<Vote />}/>
      </Routes>
    </div>
    </>
  )

    
}

export default App;