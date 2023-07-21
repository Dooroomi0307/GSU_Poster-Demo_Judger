import Vote from './Vote.js';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './prevote.css';

const MyComponent = () => {
  const [Start, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const firestore = firebase.firestore();
    const collectionRef = firestore.collection('StartStop Vote').doc('Prevotepage');

    const unsubscribe = collectionRef.onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setIsActivated(data.Start);
      } else {
        setIsActivated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  if (!Start) {
    return <div class="votemsg">Voting is not in session</div>; // Render a message when voting is not activated
  }

  return (
    <div>
      {/* Render your component's content */}
      <h1 >Voting in session!</h1>
      <Vote />
    </div>
  );
};

export default MyComponent;
