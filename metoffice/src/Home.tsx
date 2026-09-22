import React, {useState} from 'react';
import './index.css'
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [enjoysFun, setEnjoysFun] = useState<boolean>();
  const [randomNumber, setRandomNumber] = useState<number>();
  const [randomNumberButtonVisible, setRandomNumberButtonVisible] = useState<boolean>(true);

  const navigate = useNavigate();

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
  
  const handleReset = (): React.ReactElement => {
    setEnjoysFun(undefined)
  }

  const handleCheck = (): React.ReactElement => {
    setEnjoysFun(true)
  }

  const redirectToWeather = (): React.ReactElement => {
    navigate("/weather")
  }

  let page_content;
  if (enjoysFun === undefined){
    page_content = <>
    <p> Beth is testing how to do react...</p>
    <p className="fun-question"> Do you like fun?</p>
      <div className="fun-options">
        <label> Yes
          <input
            type="checkbox"
            onChange={handleCheck}
            />
        </label>
        <label> No
          <input
            type="checkbox"
            onChange={redirectToWeather}
            />
        </label>
      </div> </>
  } else if (enjoysFun) {
    page_content =  <>
    {randomNumberButtonVisible ? (
      <button className="fun-button fun-button--primary" onClick = {handleRandomButtonClick}> Click to generate a random number! </button>
        ) : (
      <>
      <h1 className="fun-number" key={randomNumber}>{randomNumber}</h1>
      <div className="fun-buttons">
        <button className="fun-button fun-button--again" onClick = {updateRandomNumber}> Choose a new number (fun!)</button>
        <button className="fun-button fun-button--reset" onClick = {handleReset}> Reset (less fun) </button>
      </div>
    </>)}
    </>
  }

  return <>
  <h1>Welcome to my Home Page!</h1>
  <div className="fun-zone">
    {page_content}
  </div>
  </>
}

export default Home;
