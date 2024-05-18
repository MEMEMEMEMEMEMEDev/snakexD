// GameOver.tsx

import React from "react";
import "./GameOver.scss";

interface IGameOver {
  goToMenu: () => void;
}

const GameOver: React.FC<IGameOver> = ({ goToMenu }) => {
  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <button onClick={goToMenu}>Go to Menu</button>
    </div>
  );
};

export default GameOver;
