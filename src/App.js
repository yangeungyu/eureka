import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MenuPage1 from './MenuPage1';
import MenuPage2 from './MenuPage2';
import MenuPage3 from './MenuPage3';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route
            path="/*"
            element={<AppContent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function AppContent({ menuOpen, setMenuOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isStartScreen = location.pathname === '/';

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path, {
      state: { 
        resetLevel: true,
        timestamp: Date.now() // 매번 다른 state를 전달하여 강제로 업데이트
      },
      replace: true
    });
    setMenuOpen(false);
  };

  const handleExit = () => {
    navigate('/', { replace: true });
    setMenuOpen(false);
  };

  return (
    <div>
      {!isStartScreen && (
        <>
          <div className="menu-button" onClick={toggleMenu}>
            ☰
          </div>
          <div className="exit-button" onClick={handleExit}>
            ✕
          </div>
          <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
            <div className="menu-item" onClick={() => handleMenuClick('/menu1')}>레벨 선택하기</div>
            <div className="menu-item" onClick={() => handleMenuClick('/menu2')}>주제 추가하기</div>
            <div className="menu-item" onClick={() => handleMenuClick('/menu3')}>계산 야바위</div>
          </div>
        </>
      )}
      <div className={`app-content ${menuOpen ? 'blur' : ''}`}>
        <Routes>
          <Route path="/menu1" element={<MenuPage1 />} />
          <Route path="/menu2" element={<MenuPage2 />} />
          <Route path="/menu3" element={<MenuPage3 />} />
        </Routes>
      </div>
    </div>
  );
}

function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className="start-screen" onClick={() => navigate('/menu1')}>
      <div className="logo">
        <img src="/logo192.png" alt="UTOPICAH Logo" className="app-logo" />
      </div>
      <div className="start-text">
        화면을 누르면 시작됩니다.
      </div>
    </div>
  );
}

export default App;
