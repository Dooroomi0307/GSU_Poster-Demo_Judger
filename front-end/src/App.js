import firebase from 'firebase/app';
import Navbar from "./elements/Navbar.js"
import Navbar1 from "./elements/Navbar1.js"
import Home from "./Pages/Home.js"
import Login from "./Pages/Login/Login.jsx"
import ParticipantList from "./Pages/ParticipantList/ParticipantList.js"
import Evaluate from "./Pages/Evaluate/Evaluate.js"
import Analysis from "./Pages/Analysis/Analysis.js"
import Vote from "./Pages/Vote/Vote.js"
import MyComponent from "./Pages/Vote/Prevote.js"
import PartList from "./Pages/ParticipantList/Partlist.js"
import AdminPanel from "./Pages/Admin/AdminPanel.js"
import CandidateList from "./Pages/Candidate/Candidate.js"
import Winner from "./Pages/Winner/Winner.js"
import PL from "./Pages/ParticipantList/pl.js"

import { Route, Routes } from "react-router-dom"

function App() {
  
  const n1 = ['/vote', '/partlist','/winner'];
  const n2 = ['/analysis', '/participantlist', '/candidatelist','/adminpanel']
  const shouldDisplayNavbar = n1.includes(window.location.pathname);

  const shouldDisplayNavbar1 = n2.includes(window.location.pathname);

  
  //use capital letter for component name
  //removed Navbar; if you want to display navbar put <Navbar /> before <div className="container">
  return(
    <>
      {shouldDisplayNavbar && <Navbar />}
      {shouldDisplayNavbar1 && <Navbar1 />}<div className="container">
      <Routes>
        <Route path="" element={<Login />}/>
        <Route path="/participantlist" element={<ParticipantList />}/>
        <Route path="/analysis" element={<Analysis />}/>
        <Route path="/vote" element={<MyComponent />}/>
        <Route path="/candidatelist" element={<CandidateList />}/>
        <Route path="/partlist" element={<PartList />}/>
        <Route path="/adminpanel" element={<AdminPanel />}/>
        <Route path="/winner" element={<Winner />}/>
        <Route path="/pl" element={<PL />}/>
      </Routes>
    </div>
    </>
  )

    
}

export default App;