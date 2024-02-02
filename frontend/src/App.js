import React from 'react';
import Home from './pages/Home';
import LiveCCTV from './pages/LiveCCTV';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetectAccident from './pages/DetectAccident';

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/live-cctv" element={<LiveCCTV/>}></Route>
        <Route exact path="/detected-accidents" element={<DetectAccident/>}></Route>
      </Routes>
      </Router>  
    </>
  );
}

