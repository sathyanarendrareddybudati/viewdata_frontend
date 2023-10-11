import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Data from './upload_data';
import Homepage from './home';
import PlotPage from './plot_data';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/data" element={<Data />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/plot" element={<PlotPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
