import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Winner.css';
import Confetti from 'react-confetti';

const Winner = () => {
    const [isStarted, setIsStarted] = useState(true); // Set initial value to true to display "Loading..."
    const [isWinnerDeclared, setIsWinnerDeclared] = useState(false);
    const [winnerName, setWinnerName] = useState(null);
  
    useEffect(() => {
      const firestore = firebase.firestore();
      const startStopVoteDocRef = firestore.collection('StartStop Vote').doc('Prevotepage');
  
      // Listen for changes to the "Start" field in the "StartStopVote/Prevote" document
      const unsubscribe = startStopVoteDocRef.onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
          setIsStarted(data.Start);
          setIsWinnerDeclared(data.isWinnerDeclared);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    useEffect(() => {
      if (!isStarted && !isWinnerDeclared) {
        // Fetch the winner when "isStarted" is false (voting started) and "isWinnerDeclared" is true
        const firestore = firebase.firestore();
        const voteCollection = firestore.collection('Vote');
  
        voteCollection.get().then((querySnapshot) => {
          let maxCount = 0;
          let winner = null;
  
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.Count > maxCount) {
              maxCount = data.Count;
              winner = data.Name;
            }
          });
  
          setWinnerName(winner);
        });
      }
    }, [isStarted, isWinnerDeclared]);
  
    return (
        <div class="this">
        <div class="main">
        {!isStarted ? (
        isWinnerDeclared ? (
            <p>Voting has not started yet.</p>
          
      ) : (
        
        <div class="center">
            <p>Congratulations! 
                <br /> 
                🏆{winnerName} is the winner🏆</p>
                <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={900}
          />
            
          </div>
        
        
      )
    ) : (
      <p>Counting The Scores...</p>
    )}
      </div>
      </div>
    );
  };
  
  export default Winner;