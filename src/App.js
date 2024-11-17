import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import MenuPage1 from './MenuPage1';
import MenuPage2 from './MenuPage2';
import MenuPage3 from './MenuPage3';
import './App.css';
import logo from './assets/logo1.png'; // 로고 파일 경로

function App() {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 여부

  // 메뉴 열기/닫기
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div>
        {/* 메뉴 버튼 */}
        <div className="menu-button" onClick={toggleMenu}>
          ☰
        </div>

        {/* 메뉴창 */}
        {menuOpen && (
          <div className="menu-container open">
            <Link to="/menu1" className="menu-link" onClick={() => setMenuOpen(false)}>
              마, 자신있나?!
            </Link>
            <Link to="/menu2" className="menu-link" onClick={() => setMenuOpen(false)}>
              질문게시판
            </Link>
            <Link to="/menu3" className="menu-link" onClick={() => setMenuOpen(false)}>
              계산 야바위
            </Link>
          </div>
        )}

        {/* 페이지 라우팅 */}
        <Routes>
          {/* 처음 화면 */}
          <Route
            path="/"
            element={<StartScreen />}
          />
          {/* 레벨 선택 화면 */}
          <Route path="/menu1" element={<MenuPage1 initialView="level-selection" />} />
          <Route path="/menu2" element={<MenuPage2 />} />
          <Route path="/menu3" element={<MenuPage3 />} />
        </Routes>
      </div>
    </Router>
  );
}

// 처음 화면 컴포넌트
function StartScreen() {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  return (
    <div
      className="start-screen"
      onClick={() => navigate('/menu1')} // 클릭 시 다음 화면으로 이동
    >
      {/* 로고 */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="app-logo" />
      </div>
      {/* uTOPIC_AH 글씨 */}
      <h1 className="logo">UTOPICAH</h1>
      <p>화면을 누르면 시작됩니다.</p>
    </div>
  );
}

export default App;
