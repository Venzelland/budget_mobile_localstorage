import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Budget from './Budget';
import Charts from './Charts';
import Plans from './Plans';
import './App.css';

const App: React.FC = () => {
  return (
      <Router>
        <div className="container">
          <nav>
            <ul>
              <li><Link to="/">Бюджет</Link></li>
              <li><Link to="/charts">Графики</Link></li>
              <li><Link to="/plans">Планы</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Budget />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/plans" element={<Plans />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
