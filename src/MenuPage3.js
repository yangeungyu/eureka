import React, { useState, useEffect } from 'react';
import './App.css';

function MenuPage3() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [cups, setCups] = useState([]);
  const [selectedCup, setSelectedCup] = useState(null);
  const [shuffled, setShuffled] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  const [isFlipping, setIsFlipping] = useState(false); // 컵 뒤집기 애니메이션 여부
  const [isShuffling, setIsShuffling] = useState(false); // 섞기 애니메이션 여부
  const [isCupFlipped, setIsCupFlipped] = useState(false); // 컵이 뒤집어졌는지 확인
  const [isNumberFlipped, setIsNumberFlipped] = useState(false); // 숫자 뒤집기 상태

  const cupImageURL = 'https://w7.pngwing.com/pngs/292/229/png-transparent-white-plastic-disposable-cup-netpbm-format-data-composite-material-paper-cup-angle-white-muffin.png';

  // 컵 섞기 함수
  const shuffleCups = () => {
    let cupArray = [1, 2, 3, 4, 5];
    for (let i = cupArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cupArray[i], cupArray[j]] = [cupArray[j], cupArray[i]]; // 번호 섞기
    }
    setCups(cupArray);
    setShuffled(true);
    setSelectedCup(cupArray[Math.floor(Math.random() * 5)]);
    setIsFlipping(true); // 컵 뒤집기 시작
    setTimeout(() => {
      setIsCupFlipped(true); // 컵 뒤집기 완료
      setIsFlipping(false); // 뒤집기 애니메이션 종료
      setIsShuffling(true); // 섞기 애니메이션 시작
    }, 1000); // 1초 후에 컵을 뒤집고 섞기 애니메이션 시작
    setTimeout(() => setIsShuffling(false), 2000); // 섞기 애니메이션 종료
    setTimeout(() => setIsNumberFlipped(true), 2000); // 2초 후 숫자 뒤집기 시작
  };

  // 게임 시작 함수
  const startGame = () => {
    setIsGameStarted(true);
    setResultMessage('');
    shuffleCups();
  };

  // 게임 리셋
  const resetGame = () => {
    setIsGameStarted(false);
    setCups([]);
    setSelectedCup(null);
    setShuffled(false);
    setUserChoice(null);
    setResultMessage('');
    setIsFlipping(false); // 뒤집기 리셋
    setIsShuffling(false); // 섞기 애니메이션 리셋
    setIsCupFlipped(false); // 컵 뒤집기 상태 리셋
    setIsNumberFlipped(false); // 숫자 뒤집기 상태 리셋
  };

  // 사용자가 컵을 클릭했을 때
  const handleCupClick = (cupNumber) => {
    if (!shuffled || isFlipping || isShuffling) return; // 컵이 섞이지 않았거나, 애니메이션 중이라면 클릭 못하게
    setUserChoice(cupNumber);
  };

  // 게임 결과 확인
  useEffect(() => {
    if (userChoice !== null) {
      setIsFlipping(false); // 컵 클릭 후 애니메이션 끝내기
      if (userChoice === selectedCup) {
        setResultMessage('정답! 🎉');
      } else {
        setResultMessage(`틀렸습니다. 정답은 컵 ${selectedCup}번!`);
      }
    }
  }, [userChoice, selectedCup]);

  return (
    <div className="game-container">
      <h1>컵 야바위 게임</h1>

      {!isGameStarted ? (
        <button onClick={startGame} className="start-button">
          게임 시작
        </button>
      ) : (
        <div>
          <div className="cups-container">
            {cups.map((cup, index) => (
              <div
                key={index}
                className={`cup ${isFlipping ? 'flipping' : ''} ${isShuffling ? 'shuffling' : ''} ${isCupFlipped ? 'flipped' : ''}`}
                onClick={() => handleCupClick(cup)}
              >
                <div className="cup-image">
                  <img
                    src={cupImageURL}
                    alt={`컵 ${cup}`}
                    className="cup-img"
                  />
                </div>
                <div className={`cup-number ${isNumberFlipped ? 'flipped-number' : ''}`}>{cup}</div> {/* 숫자 뒤집기 */}
              </div>
            ))}
          </div>
          <p className="result">{resultMessage}</p>
        </div>
      )}
      {isGameStarted && (
        <button onClick={resetGame} className="reset-button">
          게임 리셋
        </button>
      )}
    </div>
  );
}

export default MenuPage3;
