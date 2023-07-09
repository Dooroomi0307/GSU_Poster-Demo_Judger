import './elements/App.css'
import Navbar from "./elements/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login/Login"
import ParticipantList from "./pages/ParticipantList/ParticipantList"
import Evaluate from "./pages/Evaluate/Evaluate"
import Analysis from "./pages/Analysis/Analysis"
import Vote from "./pages/Vote/Vote"
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