import React from 'react';

function RandomButton({ getTopic }) {
  return (
    <div className="random-button-container">
      <button
        className="random-button"
        onClick={getTopic}
      >
        랜덤 대화 주제 받기! 🎲
      </button>
    </div>
  );
}

export default RandomButton;
