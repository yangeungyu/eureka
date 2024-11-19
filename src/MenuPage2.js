import React, { useState } from 'react';
import './App.css';

function MenuPage2() {
  const [topics, setTopics] = useState([]); 
  const [newTopic, setNewTopic] = useState('');

  // 주제 추가 함수
  const addTopic = () => {
    if (newTopic.trim() === '') {
      alert('주제를 입력해주세요!');
      return;
    }
    // 새로운 주제를 객체로 추가 (추천 수 포함)
    setTopics([...topics, {
      text: newTopic,
      likes: 0,
      id: Date.now() // 고유 ID 추가
    }]);
    setNewTopic('');
  };

  // 엔터키 처리 함수
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTopic();
    }
  };

  // 추천 처리 함수
  const handleLike = (id) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, likes: topic.likes + 1 } : topic
    ));
  };

  // 주제 삭제 함수
  const deleteTopic = (id) => {
    setTopics(topics.filter(topic => topic.id !== id));
  };

  return (
    <div className="menu-page-2">
      <h1>주제 추천 게시판</h1>
      <p>여기에 대화 주제를 추가하고 관리할 수 있습니다.</p>

      {/* 입력 필드 */}
      <div className="input-container">
        <input
          type="text"
          placeholder="새로운 주제를 추천해주세요 !"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-field"
        />
      </div>

      {/* 주제 목록 */}
      <div className="topic-list-container">
        <ul className="topic-list">
          {topics.map((topic) => (
            <li key={topic.id} className="topic-item">
              <div className="topic-content">
                <div className="topic-text-container">
                  <span className="topic-text">{topic.text}</span>
                </div>
                <div className="topic-actions">
                  <button
                    onClick={() => handleLike(topic.id)}
                    className="like-button"
                  >
                    👍 {topic.likes}
                  </button>
                  <button
                    onClick={() => deleteTopic(topic.id)}
                    className="delete-button"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MenuPage2;
