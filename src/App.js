import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Budget from './components/Budget/Budget';
import Charts from './components/Charts/Charts';
import Plans from './components/Plans/Plans';
import Invest from './components/Invest/Invest';
import Formulas from './components/Formulas/Formulas';

import './reset.css'; // Подключите файл сброса стилей
import './styles.css'; // Подключите основные стили

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
      <Router>
        <div className="wrapper">
          {/* Затенение фона при открытии меню */}
          <div className={`overlay ${menuOpen ? 'show' : ''}`} onClick={toggleMenu}></div>
          <nav className="navbar">
            <div className="burger-menu" onClick={toggleMenu}>
              <div className={`line ${menuOpen ? 'open' : ''}`}></div>
              <div className={`line ${menuOpen ? 'open' : ''}`}></div>
              <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            </div>
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <li><Link to="/budget_mobile_localstorage" onClick={toggleMenu}>Бюджет</Link></li>
              <li><Link to="/budget_mobile_localstorage/charts" onClick={toggleMenu}>Графики</Link></li>
              <li><Link to="/budget_mobile_localstorage/plans" onClick={toggleMenu}>Планы</Link></li>
              <li><Link to="/budget_mobile_localstorage/invest" onClick={toggleMenu}>Инвестирование</Link></li>
              <li><Link to="/budget_mobile_localstorage/formulas" onClick={toggleMenu}>Формулы</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/budget_mobile_localstorage/" element={<Budget />} />
            <Route path="/budget_mobile_localstorage/charts" element={<Charts />} />
            <Route path="/budget_mobile_localstorage/plans" element={<Plans />} />
            <Route path="/budget_mobile_localstorage/invest" element={<Invest />} />
            <Route path="/budget_mobile_localstorage/formulas" element={<Formulas />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
