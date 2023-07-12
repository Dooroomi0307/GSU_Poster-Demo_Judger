import './elements/App.css';
import Navbar from "./elements/Navbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login/Login.jsx"
import ParticipantList from "./Pages/ParticipantList/ParticipantList"
import Evaluate from "./Pages/Evaluate/Evaluate"
import Analysis from "./Pages/Analysis/Analysis"
import Vote from "./Pages/Vote/Vote"
import { Route, Routes } from "react-router-dom"

function App() {

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
      </Routes>
    </div>
    </>
  )

    
}

export default App;