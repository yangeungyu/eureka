import React, { useState } from 'react';
import './App.css'; // 스타일을 App.css에 통합

function MenuPage2() {
  const [questions, setQuestions] = useState([]); // 질문 목록
  const [newQuestion, setNewQuestion] = useState(''); // 새로 입력한 질문

  // 질문 추가 함수
  const addQuestion = () => {
    if (newQuestion.trim() === '') {
      alert('질문을 입력해주세요!');
      return;
    }
    setQuestions([...questions, newQuestion]);
    setNewQuestion(''); // 입력 필드 초기화
  };

  // 질문 삭제 함수
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="menu-page-2">
      <h1>질문 게시판</h1>
      <p>여기에 질문을 추가하고 관리할 수 있습니다.</p>

      {/* 입력 필드 및 추가 버튼 */}
      <div className="input-container">
        <input
          type="text"
          placeholder="새로운 질문을 입력하세요"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="input-field"
        />
        <button onClick={addQuestion} className="add-button">
          추가하기
        </button>
      </div>

      {/* 질문 목록 */}
      <ul className="question-list">
        {questions.map((question, index) => (
          <li key={index} className="question-item">
            {question}
            <button
              onClick={() => deleteQuestion(index)}
              className="delete-button"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuPage2;
