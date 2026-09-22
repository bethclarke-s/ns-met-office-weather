import React, {useState} from 'react';
import './index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.js';
import Weather from './Weather.js';

function App(): React.ReactElement {

  return <>
      <BrowserRouter>
        <nav>
          <Link to="/"><img src="/home_icon.jpg" alt="Home"/></Link> |{" "}
          <Link to="/weather"><img src="/sun_icon.png" alt="Weather"/></Link> |{" "}
          <a target="_blank" href="https://www.wikipedia.com/wiki/Special:Random"><img src="/question_mark.png" alt="Surprise"/></a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </>;
}

export default App;
