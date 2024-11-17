import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import RandomButton from './components/RandomButton';
import TopicCard from './components/TopicCard';
import StartScreen from './components/StartScreen';

function MenuPage1() {
  const [showMenu, setShowMenu] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [timer, setTimer] = useState(7);
  const [timerPaused, setTimerPaused] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const timerRef = useRef(null);

  const topics = [
    "가장 좋아하는 음식은?",
    "특별한 취미나 관심사가 있나요?",
    "최근에 본 영화나 드라마 중 가장 재미있었던 것은?",
    "어린 시절의 꿈은 무엇이었나요?",
    "가장 기억에 남는 여행지는 어디인가요?",
    "스트레스 해소 방법은 무엇인가요?",
    "좋아하는 계절과 그 이유는?",
    "최근에 새로 시작한 것이 있다면?",
    "자신의 장점은 무엇이라고 생각하나요?",
    "5년 후의 목표는 무엇인가요?",
    "지금까지 해본 아르바이트 중 가장 기억에 남는 것은?",
    "어떤 음악을 좋아하나요?",
    "주말에는 주로 무엇을 하면서 시간을 보내나요?",
    "가장 존경하는 인물은 누구인가요?",
    "최근에 도전해보고 싶은 것이 있다면?",
    "가장 기억에 남는 생일은 언제인가요?",
    "좋아하는 운동이나 스포츠가 있나요?",
    "지금까지 받은 선물 중 가장 기억에 남는 것은?",
    "어떤 직업을 갖고 싶은가요?",
    "가장 행복했던 순간은 언제인가요?",
    "좋아하는 책이나 작가가 있나요?",
    "자신만의 스트레스 해소 방법이 있다면?",
    "가장 자신 있는 요리는 무엇인가요?",
    "어떤 종류의 영화를 좋아하나요?",
    "가장 기억에 남는 선생님은 누구인가요?",
    "어떤 날씨를 좋아하나요?",
    "최근에 감동받은 일이 있다면?",
    "가장 좋아하는 장소는 어디인가요?",
    "어떤 스타일의 옷을 즐겨 입나요?",
    "지금까지 한 선택 중 가장 잘한 선택은?",
    "가장 친한 친구와는 어떻게 만났나요?",
    "어떤 향기를 좋아하나요?",
    "가장 기억에 남는 실수나 실패 경험은?",
    "좋아하는 애니메이션이나 만화가 있나요?",
    "어떤 종류의 선물을 받고 싶나요?",
    "가장 좋아하는 휴가 스타일은?",
    "최근에 새로 배운 것이 있다면?",
    "어떤 카페나 음식점을 자주 가나요?",
    "가장 기억에 남는 공연이나 전시는?",
    "좋아하는 동물이 있나요?",
    "어떤 방식으로 새로운 사람들과 친해지나요?",
    "가장 기억에 남는 compliment는?",
    "좋아하는 디저트는 무엇인가요?",
    "어떤 버킷리스트를 가지고 있나요?",
    "가장 최근에 울었던 적은 언제인가요?",
    "좋아하는 유튜버나 인플루언서가 있나요?",
    "어떤 앱을 자주 사용하나요?",
    "가장 기억에 남는 게임은 무엇인가요?",
    "최근에 산 것 중 가장 마음에 드는 것은?",
    "어떤 방식으로 하루를 마무리하나요?",
  ];

  useEffect(() => {
    if (!timerPaused && timer > 0 && showMenu && selectedLevel) {
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
  }, [timerPaused, showMenu, selectedLevel]);

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

  const handleStartClick = () => {
    setShowMenu(true);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleBack = () => {
    setSelectedLevel(null);
    setCurrentTopic(null);
    setTimer(7);
    setTimerPaused(true);
  };

  const handleConfidentClick = () => {
    setShowMenu(true);
    setSelectedLevel(null);
    setCurrentTopic(null);
    setTimer(7);
    setTimerPaused(true);
  };

  return (
    <div className="menu-page">
      {!showMenu ? (
        <div className="start-screen">
          <img src="/logo192.png" alt="logo" className="logo" />
          <StartScreen onStart={handleStartClick} />
        </div>
      ) : (
        <div>
          <div className="exit-button" onClick={() => {
            setShowMenu(false);
            setSelectedLevel(null);
            setCurrentTopic(null);
          }}>
            ✕
          </div>
          <img src="/logo192.png" alt="logo" className="game-logo" />
          {!selectedLevel ? (
            <div className="level-selection-screen">
              <div className="level-buttons">
                <button onClick={() => handleLevelSelect('easy')}>
                  Lv 1
                </button>
                <button onClick={() => handleLevelSelect('medium')}>
                  Lv 2
                </button>
                <button onClick={() => handleLevelSelect('hard')}>
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
                    className="explosion-image explosion-animation"
                  />
                </div>
              )}
              <div className="back-button" onClick={handleBack}>
                ←
              </div>
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
      )}
    </div>
  );
}

export default MenuPage1;
