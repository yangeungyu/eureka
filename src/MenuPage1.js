import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import RandomButton from './components/RandomButton';
import TopicCard from './components/TopicCard';

function MenuPage1() {
  const location = useLocation();
  const [currentTopic, setCurrentTopic] = useState(null);
  const [timer, setTimer] = useState(7);
  const [timerPaused, setTimerPaused] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // 새로운 state가 들어올 때마다 레벨을 리셋
    if (location.state?.resetLevel) {
      setSelectedLevel(null);
      setCurrentTopic(null);
      setTimer(7);
      setTimerPaused(true);
    }
  }, [location.state]);

  const topics = [
    "가장 좋아하는 음식은 무엇인가요?",
    "어떤 취미를 가지고 계신가요?",
    "가장 기억에 남는 여행지는 어디인가요?",
    "최근에 본 영화나 드라마 중 추천하고 싶은 작품이 있나요?",
    "스트레스 해소법은 무엇인가요?",
    "주말에는 주로 무엇을 하면서 시간을 보내시나요?",
    "좋아하는 계절과 그 이유는 무엇인가요?",
    "최근에 도전해보고 싶은 것이 있다면 무엇인가요?",
    "지금까지 읽은 책 중 가장 인상 깊었던 책은 무엇인가요?",
    "어떤 음악을 즐겨 듣나요?",
    "가장 존경하는 인물은 누구인가요?",
    "어린 시절의 꿈은 무엇이었나요?",
    "가장 기억에 남는 선물은 무엇인가요?",
    "가장 좋아하는 장소는 어디인가요?",
    "최근에 새로 배운 것이 있다면 무엇인가요?",
    "가장 자신있는 요리는 무엇인가요?",
    "가장 기억에 남는 생일은 언제인가요?",
    "지금 가장 갖고 싶은 것은 무엇인가요?",
    "가장 기억에 남는 칭찬은 무엇인가요?",
    "가장 좋아하는 날씨는 어떤 날씨인가요?",
    "가장 기억에 남는 게임은 무엇인가요?",
    "최근에 산 것 중 가장 마음에 드는 것은?",
    "어떤 방식으로 하루를 마무리하나요?",
  ];

  useEffect(() => {
    if (!timerPaused && timer > 0 && selectedLevel) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerRef.current);
            setShowExplosion(true);
            setTimeout(() => {
              setShowExplosion(false);
              return 7;
            }, 2000);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerPaused, selectedLevel]);

  const resetTimer = () => {
    setTimer(7);
    setTimerPaused(false);
  };

  const toggleTimer = () => {
    setTimerPaused(!timerPaused);
  };

  const getRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCurrentTopic(topics[randomIndex]);
    resetTimer();
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className="menu-page">
      <div>
        <img src="/logos2.png" alt="logo" className="game-logo" />
        {!selectedLevel ? (
          <div className="level-selection-screen">
            <div className="level-buttons">
              <button onClick={() => handleLevelSelect('easy')}>
                <img src="/onestar.png" alt="onestar" className="level-icon" />
                Lv 1
              </button>
              <button onClick={() => handleLevelSelect('medium')}>
                <img src="/twostar.png" alt="twostar" className="level-icon" />
                Lv 2
              </button>
              <button onClick={() => handleLevelSelect('hard')}>
                <img src="/threestar.png" alt="threestar" className="level-icon" />
                Lv 3
              </button>
            </div>
          </div>
        ) : (
          <>
            {showExplosion && (
              <div className="explosion-container">
                <img
                  src="/explosion.gif"
                  alt="Explosion"
                  className="explosion-animation"
                />
              </div>
            )}
            <div className="current-level">
            </div>
            <Header />
            <RandomButton getTopic={getRandomTopic} />
            <div className="timer-container" onClick={toggleTimer}>
              <p className={`timer-text ${timer <= 3 ? 'red-text shake' : ''} ${timerPaused ? 'paused' : ''}`}>
                {timer}초
              </p>
            </div>
            {currentTopic && <TopicCard topic={currentTopic} />}
          </>
        )}
      </div>
    </div>
  );
}

export default MenuPage1;
