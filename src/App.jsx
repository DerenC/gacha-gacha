import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import Inventory from './Inventory';
import History from './History';

export const GachaContext = createContext();

const COLORS = ['#FF5555', '#55FF55', '#5555FF', '#FFFF55', '#FF55FF', '#55FFFF', '#FFAA00'];

function App() {
  const [capsules, setCapsules] = useState([]);
  const [history, setHistory] = useState([]);
  const location = useLocation();

  // Load from local storage
  useEffect(() => {
    const savedCapsules = localStorage.getItem('gacha_capsules');
    const savedHistory = localStorage.getItem('gacha_history');
    if (savedCapsules) setCapsules(JSON.parse(savedCapsules));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('gacha_capsules', JSON.stringify(capsules));
    localStorage.setItem('gacha_history', JSON.stringify(history));
  }, [capsules, history]);

  const addCapsule = (text) => {
    const newCapsule = {
      id: Date.now().toString(),
      text,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
    setCapsules([...capsules, newCapsule]);
  };

  const updateCapsule = (id, newText) => {
    setCapsules(capsules.map(c => c.id === id ? { ...c, text: newText } : c));
  };

  const deleteCapsule = (id) => {
    setCapsules(capsules.filter(c => c.id !== id));
  };

  const addHistory = (capsule, status) => {
    setHistory([{ ...capsule, status, drawnAt: new Date().toISOString() }, ...history]);
  };

  return (
    <GachaContext.Provider value={{
      capsules, addCapsule, updateCapsule, deleteCapsule, setCapsules,
      history, addHistory
    }}>
      <div className="app-container">
        <header>
          <h1>Gacha Gachapon</h1>
          <nav>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Machine</Link>
            <Link to="/inventory" className={location.pathname === '/inventory' ? 'active' : ''}>Items</Link>
            <Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>History</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </GachaContext.Provider>
  );
}

export default App;
