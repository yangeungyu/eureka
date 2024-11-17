import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-button" onClick={onStart}>
      <p>마 자신있냐</p>
    </div>
  );
};

export default StartScreen;
