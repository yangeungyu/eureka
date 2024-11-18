import React from 'react';

function Header({ level }) {
  return (
    <header style={{ textAlign: 'center', padding: '1em', backgroundColor: '#f0f0f0' }}>
      {level && <h2 style={{ marginTop: '0.5em', fontSize: '2em' }}>Lv {level}</h2>}
    </header>
  );
}

export default Header;
