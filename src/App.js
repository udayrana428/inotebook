import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert="Do you want to delete"/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />

          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
