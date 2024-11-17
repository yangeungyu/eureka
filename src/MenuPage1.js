import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RandomButton from './components/RandomButton';
import TopicCard from './components/TopicCard';
import './App.css';

function MenuPage1({ initialView }) {
  const [startApp, setStartApp] = useState(initialView === 'level-selection'); // 앱 시작 여부
  const [levelSelected, setLevelSelected] = useState(false); // 레벨 선택 여부
  const [currentTopic, setCurrentTopic] = useState(''); // 랜덤 주제
  const [timer, setTimer] = useState(7); // 타이머 상태
  const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머 실행 여부
  const [explosionVisible, setExplosionVisible] = useState(false); // 폭발 이미지 상태
  const [level, setLevel] = useState(1); // 선택된 레벨
  const [usedTopics, setUsedTopics] = useState([]); // 이미 나온 질문

  // 각 레벨에 따른 주제 리스트
  const levelTopics = {
    1: [
      '여기 사람들이랑 친해지고 싶은 사람?',
      '누가 제일 연애하면 잘해줄 거 같아?',
      '누가 제일 술 잘 마실 거 같아? 맥여!',
      '각자 주사가 어떻게 돼?',
      '누가 제일 옷을 잘 입었어?',
      '같은 지역 사는 사람들끼리 짠~',
    ],
    2: [
      '나는 이런 일탈을 해본 적이 있다!',
      '가장 최근 연애는? 그리고 헤어진 이유는?',
      '전애인의 뭐가 제일 싫었어?',
      '가장 최악이었던 애인은?',
      '누가 가장 연애 못해봤을 거 같아?',
      '솔직히 오늘 나온 거 후회하는 사람!',
    ],
    3: [
      '누가 제일 야할 거 같아?',
      '오늘 제일 혀가 말랑할 거 같은 사람은?',
      '오늘 집 들어갈 생각 없는 사람은?',
      '여기서 제일 맘에 드는 사람 지목하기!',
      '누가 고딩 때 제일 잘 나갔을 거 같아?',
      '얘는 진짜 별로다.. 나가!',
    ],
  };

  // 랜덤 주제 설정
  const getRandomTopic = () => {
    const topics = levelTopics[level].filter((topic) => !usedTopics.includes(topic));

    if (topics.length === 0) {
      alert('모든 주제가 다 나왔습니다!');
      stopTimer();
      return;
    }

    const randomIndex = Math.floor(Math.random() * topics.length);
    const selectedTopic = topics[randomIndex];
    setCurrentTopic(selectedTopic);
    setUsedTopics((prev) => [...prev, selectedTopic]);

    // 타이머 초기화 및 시작
    resetTimer();
    setExplosionVisible(false); // 새 질문 나오면 폭탄 숨기기
  };

  // 타이머 시작 함수
  const resetTimer = () => {
    setTimer(7);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    if (!isTimerRunning) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setExplosionVisible(true); // 타이머가 0초가 되면 폭탄 보이기
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isTimerRunning]);

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimer(7);
  };

  // 첫 화면 클릭 시 시작
  const handleStart = () => {
    setStartApp(true);
  };

  // 레벨 선택 후 메인 화면으로 넘어가기
  const handleLevelSelect = (level) => {
    setLevel(level);
    setLevelSelected(true);
    getRandomTopic(); // 첫 질문 출력
  };

  // 종료하기 버튼 클릭 시 첫 화면으로 돌아가기
  const handleExit = () => {
    setStartApp(false);
    setLevelSelected(false);
    setCurrentTopic('');
    setTimer(7);
    setIsTimerRunning(false);
    setExplosionVisible(false);
    setUsedTopics([]);
  };

  return (
    <div>
      {/* 종료 버튼 */}
      <div className="exit-button" onClick={handleExit}>
        X
      </div>

      {/* 메뉴창을 제외한 나머지 화면 */}
      {!startApp && (
        <div className="start-screen" onClick={handleStart}>
          <h1 className="logo">UTOPICAH</h1>
          <p>화면을 누르면 시작됩니다</p>
        </div>
      )}

      {startApp && !levelSelected && (
        <div className="level-selection-screen">
          <h1>레벨을 선택하세요</h1>
          <div className="level-buttons">
            <button onClick={() => handleLevelSelect(1)}>Lv1</button>
            <button onClick={() => handleLevelSelect(2)}>Lv2</button>
            <button onClick={() => handleLevelSelect(3)}>Lv3</button>
          </div>
        </div>
      )}

      {startApp && levelSelected && (
        <div>
          {explosionVisible && (
            <div className="explosion-container">
              <img
                src="/explosion.gif"
                alt="Explosion"
                className="explosion-image explosion-animation"
              />
            </div>
          )}
          <Header />
          <RandomButton getTopic={getRandomTopic} />
          {currentTopic && <TopicCard topic={currentTopic} />}
          <div className="timer-container">
            <p className={`timer-text ${timer <= 3 ? 'red-text shake' : ''}`}>
              타이머: {timer}초
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuPage1;
