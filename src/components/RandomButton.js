import React from 'react';

function RandomButton({ getTopic }) {
  return (
    <div style={{ textAlign: 'center', margin: '1em' }}>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={getTopic}
      >
        랜덤 대화 주제 받기! 🎲
      </button>
    </div>
  );
}

export default RandomButton;
