import React, {useState} from 'react';
import './index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.js';
import Weather from './Weather.js';

function App(): React.ReactElement {



  return <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/weather">Weather</Link> 
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>

      </BrowserRouter>
    </>;
}

export default App;
