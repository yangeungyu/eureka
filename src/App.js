import React, { useState } from 'react';
import Header from './components/Header';
import RandomButton from './components/RandomButton';
import TopicCard from './components/TopicCard';
import './App.css';

function App() {
  const [startApp, setStartApp] = useState(false); // 앱 시작 여부
  const [levelSelected, setLevelSelected] = useState(false); // 레벨 선택 여부
  const [currentTopic, setCurrentTopic] = useState(""); // 랜덤 주제
  const [timer, setTimer] = useState(7); // 타이머 상태 (7초로 시작)
  const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머 실행 여부
  const [timerInterval, setTimerInterval] = useState(null); // 타이머 인터벌 저장
  const [explosionVisible, setExplosionVisible] = useState(false); // 폭발 이미지 상태
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴창 열림 여부

  // 주제 리스트
  const topics = [
    "요즘 가장 행복했던 순간은?",
    "내가 가장 좋아하는 음식은?",
    "평생 한 곳에서만 살 수 있다면 어디?",
    "제일 기억에 남는 여행은?",
    "만약 로또에 당첨된다면?",
    "가장 최근에 본 영화는 뭐야?",
    "요즘 푹 빠진 취미는?",
    "제일 좋아하는 계절은?",
  ];

  // 랜덤 주제 설정
  const getRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCurrentTopic(topics[randomIndex]);
    
    // 타이머 시작
    startTimer();
  };

  // 타이머 시작 함수
  const startTimer = () => {
    if (isTimerRunning) return; // 이미 타이머가 실행 중이면 중복 실행 방지

    setIsTimerRunning(true);
    setTimer(7); // 타이머를 7초로 초기화
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown); // 타이머가 0초일 때 종료
          setExplosionVisible(true); // 타이머가 끝나면 폭발 이미지 표시
          return 0; // 타이머가 0초에 멈추도록 설정
        }
        return prev - 1;
      });
    }, 1000); // 1초 간격으로 타이머 업데이트
    setTimerInterval(countdown); // 타이머 인터벌을 상태에 저장
  };

  // 타이머 멈추는 함수
  const stopTimer = () => {
    clearInterval(timerInterval); // 타이머 인터벌 정지
    setIsTimerRunning(false); // 타이머 실행 상태 변경
  };

  // 메뉴 열기/닫기
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 첫 화면 클릭 시 시작
  const handleStart = () => {
    setStartApp(true);
  };

  // 레벨 선택 후 메인 화면으로 넘어가기
  const handleLevelSelect = () => {
    setLevelSelected(true);
  };

  // 종료하기 버튼 클릭 시 첫 화면으로 돌아가기
  const handleExit = () => {
    setStartApp(false);
    setLevelSelected(false);
    setCurrentTopic(""); // 주제 초기화
    setTimer(7); // 타이머 초기화
    setIsTimerRunning(false); // 타이머 실행 상태 초기화
    clearInterval(timerInterval); // 타이머 인터벌 초기화
    setExplosionVisible(false); // 폭발 이미지 초기화
  };

  return (
    <div>
      {/* 메뉴 버튼 */}
      <div className="menu-button" onClick={toggleMenu}>☰</div>

      {/* 메뉴창 */}
      {menuOpen && (
        <div className="menu-container open">
          <a href="#">메뉴 항목 1</a>
          <a href="#">메뉴 항목 2</a>
          <a href="#">메뉴 항목 3</a>
        </div>
      )}

      {/* 종료 버튼 */}
      <div className="exit-button" onClick={handleExit}>X</div>

      {/* 메뉴창을 제외한 나머지 화면 */}
      {!startApp && (
        <div className="start-screen" onClick={handleStart}>
          <h1 className="logo">uTOPIC_AH 🎉</h1>
          <p>화면을 누르면 시작됩니다</p>
        </div>
      )}

      {startApp && !levelSelected && (
        <div className="level-selection-screen">
          <h1>레벨을 선택하세요</h1>
          <div className="level-buttons">
            <button onClick={handleLevelSelect}>Lv1</button>
            <button onClick={handleLevelSelect}>Lv2</button>
            <button onClick={handleLevelSelect}>Lv3</button>
          </div>
        </div>
      )}

      {startApp && levelSelected && (
        <div>
          <Header />
          <RandomButton getTopic={getRandomTopic} />
          {currentTopic && <TopicCard topic={currentTopic} />}
          <div className="timer-container">
            <p>타이머: {timer}초</p>
            <div
              className="timer-box"
              onClick={stopTimer} // 타이머 중지 버튼만 클릭으로 멈추도록 설정
            >
              타이머 중지
            </div>
          </div>
          {explosionVisible && (
            <div className="explosion-container">
              <img src="/explosion.gif" alt="Explosion" className="explosion-image" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
