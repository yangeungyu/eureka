import React from 'react';

function TopicCard({ topic }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px auto',
        width: '80%',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2>{topic}</h2>
    </div>
  );
}

export default TopicCard;
