import React, {useState} from 'react';
import './index.css'

function Home() {
  const [randomNumber, setRandomNumber] = useState<number>();
  const [randomNumberButtonVisible, setRandomNumberButtonVisible] = useState<boolean>(true);

  const updateRandomNumber = (): React.ReactElement => {
    const num = Math.floor((Math.random() * 1000)+1);
    setRandomNumber(num);
  } 

  const updateRandomNumberButtonVisible = (): React.ReactElement => {
    setRandomNumberButtonVisible(!randomNumberButtonVisible);
  }

  const handleRandomButtonClick = (): React.ReactElement => {
    updateRandomNumber();
    updateRandomNumberButtonVisible();
  }

  return <>
  <h1>Welcome to my Home Page!</h1>
  <p> Beth is testing how to do react...</p>
  {randomNumberButtonVisible ? (
    <button onClick = {handleRandomButtonClick}> Click to generate a random number! </button>
    ) : (
    <> 
      <h1>{randomNumber}</h1> 
      <button onClick = {updateRandomNumber}> Choose a new number (fun!)</button>
      <button onClick = {updateRandomNumberButtonVisible}> Reset (less fun) </button> 
    </>)}
  </>;
}

export default Home;
