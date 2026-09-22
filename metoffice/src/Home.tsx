import React, {useState} from 'react';
import './index.css'

function Home() {
  const [randomNumber, setRandomNumber] = useState<number>();

  const updateRandomNumber = (): React.ReactElement => {
    const num = Math.floor((Math.random() * 1000)+1);
    setRandomNumber(num);
    console.log(randomNumber)
  } 

  const updateRandomNumberButtonVisible = (): React.ReactElement => {
    setRandomNumberButtonVisible(!randomNumberButtonVisible);
  }

  return <>
  <h1>Welcome to my Home Page!</h1>
  <p> Beth is testing how to do react...</p>
  <button onClick = {updateRandomNumber}> Click to generate a random number! </button>
  <h1>{randomNumber}</h1>
  </>;
}

export default Home;
