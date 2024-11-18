import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import TopicCard from './components/TopicCard';

function MenuPage1() {
  const location = useLocation();
  const [currentTopic, setCurrentTopic] = useState(null);
  const [timer, setTimer] = useState(7);
  const [timerPaused, setTimerPaused] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showTopicScreen, setShowTopicScreen] = useState(false);
  const [showMiddleScreen, setShowMiddleScreen] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 새로운 state가 들어올 때마다 레벨을 리셋
    if (location.state?.resetLevel) {
      setSelectedLevel(null);
      setCurrentTopic(null);
      setTimer(7);
      setTimerPaused(true);
    }
  }, [location.state]);

  const topics = {
    easy: [
      "가장 좋아하는 음식은?",
      "최근에 본 영화는?",
      "주말에 주로 무엇을 하나요?",
      "좋아하는 계절은?",
      "반려동물을 키우고 있나요?"
    ],
    medium: [
      "인생에서 가장 행복했던 순간은?",
      "여행가고 싶은 나라와 이유는?",
      "가장 감명 깊게 읽은 책은?",
      "어린 시절의 꿈은 무엇이었나요?",
      "최근에 도전해본 새로운 것은?"
    ],
    hard: [
      "당신의 인생을 영화로 만든다면 어떤 장르일까요?",
      "시간을 되돌릴 수 있다면 언제로 돌아가고 싶나요?",
      "당신이 생각하는 성공의 정의는 무엇인가요?",
      "살면서 가장 큰 영향을 받은 사람은 누구인가요?",
      "미래의 자신에게 하고 싶은 말은?"
    ]
  };

  useEffect(() => {
    if (!timerPaused && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerRef.current);
            setShowExplosion(true);
            setTimeout(() => setShowExplosion(false), 1000);
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
  }, [timerPaused]);

  const resetTimer = () => {
    setTimer(7);
    setTimerPaused(false);
  };

  const toggleTimer = () => {
    setTimerPaused(!timerPaused);
  };

  const getRandomTopic = () => {
    const levelTopics = selectedLevel === 'easy' ? topics.easy : 
                       selectedLevel === 'medium' ? topics.medium : topics.hard;
    const randomIndex = Math.floor(Math.random() * levelTopics.length);
    setCurrentTopic(levelTopics[randomIndex]);
    resetTimer();
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setShowMiddleScreen(true);
  };

  const handleMiddleScreenClick = () => {
    setShowMiddleScreen(false);
    setTimerPaused(false);
    getRandomTopic();
  };

  return (
    <div className="menu-page">
      <div>
        <img src="/logos2.png" alt="logo" className="game-logo" />
        {selectedLevel ? (
          showMiddleScreen ? (
            <div className="topic-screen" onClick={handleMiddleScreenClick} style={{animation: 'none'}}>
              <div className="random-topic-text">
                <div>랜덤</div>
                <div>&nbsp;&nbsp;&nbsp;주제</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;받기</div>
              </div>
              <img src="/dice2.png" alt="dice" className="topic-dice-icon" />
            </div>
          ) : (
            <>
              <div className="timer-container" onClick={toggleTimer}>
                <img src="/clock.png" alt="clock" className="clock-icon" />
                <p className={`timer-text ${timer <= 3 ? 'red-text shake' : ''} ${timerPaused ? 'paused' : ''}`}>
                  {timer}
                </p>
              </div>
              {showExplosion && (
                <div className="explosion-container">
                  <img src="/explosion.gif" alt="Explosion" className="explosion-animation" />
                </div>
              )}
              {currentTopic && (
                <div className="topic-card fade-in" key={currentTopic}>
                  <TopicCard topic={currentTopic} />
                </div>
              )}
              <button className="next-topic-button" onClick={getRandomTopic}>
                다음 질문 →
              </button>
            </>
          )
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default MenuPage1;
