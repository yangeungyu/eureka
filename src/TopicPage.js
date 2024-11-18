import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TopicPage() {
  const [timer, setTimer] = useState(60);
  const [topic, setTopic] = useState('');
  const location = useLocation();
  const level = location.state?.level;

  // 랜덤 주제 생성 함수
  const generateRandomTopic = () => {
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

    const levelTopics = level === 'easy' ? topics.easy : 
                       level === 'medium' ? topics.medium : topics.hard;
    const randomIndex = Math.floor(Math.random() * levelTopics.length);
    setTopic(levelTopics[randomIndex]);
  };

  useEffect(() => {
    generateRandomTopic();

    // 타이머 설정
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="topic-page">
      <div className="timer">{timer}초</div>
      <div className="topic-text">{topic}</div>
    </div>
  );
}

export default TopicPage;
