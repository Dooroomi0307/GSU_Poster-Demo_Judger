// src/AdminPanel.js

import React, { useState } from "react";
import db from '../../firebase';
import './AdminPanel.css';

const AdminPanel = () => {
    const [message, setMessage] = useState("");

  const handleStartVote = () => {
    // Set the voteStatus field to true when the Start Vote button is clicked
    db.collection("StartStop Vote").doc("Prevotepage").update({
      Start: true,
    });

    setMessage("(voting has started)");
  };

  const handleStopVote = () => {
    // Set the voteStatus field to false when the Stop Vote button is clicked
    db.collection("StartStop Vote").doc("Prevotepage").update({
        Start: false,
    });
    setMessage("(voting has stopped)");
  };

  return (
    <div>
    <div class="al">
        <div class="text">
        <h1 class="h" > Admin Panel</h1>
        </div>
    <div class= "cont">
      <button  class="but" onClick={handleStartVote}>Start vote</button>
      <button class="stop" type="button" onClick={handleStopVote}>Stop vote</button>
    </div>
    
     </div>
     <center>
    <p class="p">{message}</p>
    </center>
     </div>
  );
};

export default AdminPanel;
