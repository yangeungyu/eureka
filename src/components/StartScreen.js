import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen" onClick={onStart}>
      <div className="logo"></div>
      <div className="start-text">화면을 누르면 시작됩니다.</div>
    </div>
  );
};

export default StartScreen;
