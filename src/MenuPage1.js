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
      "외적 이상형은?",
      "취미가 뭐야?",
      "내적 이상형은?",
      "좋아하는 계절과 그 이유는?",
      "네가 아끼는 것을 보여줘",
      "가장 감명 깊게 읽은 책은?",
      "음악 취향이 어떻게 돼?",
      "최근에 꽂힌 것은?",
      "백준 티어가 어떻게 돼",
      "최근에 자주 듣는 노래/앨범 추천해줘 !",
      "로또에 당첨된다면?",
      "갖고 싶은 초능력",
      "기억에 남는 여행지"
    ],
    medium: [
      "인생에서 가장 행복했던 순간을 뽑자면?",
      "여행 가고 싶은 나라 있어? 이유는?",
      "걔랑 무슨 사이야?",
      "최근에 했던 실수랑 그로 인한 교훈에 대해 얘기해 줘",
      "성공이란 건 너에게 무슨 의미일까",
      "지금! 이 자리에서 쌓인 게 있는 사람 있으면 털고 넘어가자",
      "죽기 전에 이것만큼은 해봐야겠어."
    ],
    hard: [
      "가치관을 뒤흔들만할 큰 사건이 있었다면 얘기해 줘.",
      "지금 이 자리에 관심 있는 사람 있어?",
      "미래의 자신에게 하고 싶은 말은?",
      "순수한 사랑이라는 게 있다고 생각해?",
      "인생에서 가장 후회하는 게 있다면?",
      "행복이란 무엇일까",
      "삶의 의미란 뭘까?",
      "과거에 너에게 조언하자면?"
    ]
  };

  useEffect(() => {
    if (!timerPaused && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerRef.current);
            setShowExplosion(true);
            setTimeout(() => {
              setShowExplosion(false);
              setTimerPaused(true);
            }, 1000);
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
    if (showExplosion) {
      return;
    }
    setTimer(7);
    setTimerPaused(false);
  };

  const getRandomTopic = () => {
    if (showExplosion) {
      return;
    }
    const levelTopics = selectedLevel === 'easy' ? topics.easy : 
                       selectedLevel === 'medium' ? topics.medium : topics.hard;
    const randomIndex = Math.floor(Math.random() * levelTopics.length);
    setCurrentTopic(levelTopics[randomIndex]);
    setTimer(7);
    setTimerPaused(false);
  };

  const toggleTimer = () => {
    setTimerPaused(!timerPaused);
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
