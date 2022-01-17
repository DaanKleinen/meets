import React from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Homepage from './components/Homepage';
import EventMap from './components/EventMap';
import CreateEvent from './components/CreateEvent';
import { Routes, Route, Link } from "react-router-dom";
import { useState } from 'react/cjs/react.development';

function App() {



  return (
    <div>
    
      <Header /> 
      <Navigation />
      <div id="content">
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/map" element={<EventMap />} />
        <Route path="/createEvent" element={<CreateEvent />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
