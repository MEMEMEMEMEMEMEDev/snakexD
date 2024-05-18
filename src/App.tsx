import { useState } from "react";
import "./App.css";
import Game from "./scenes/Game/Game";
import Menu from "./scenes/Menu/Menu";
import GameOver from "./scenes/GameOver/GameOver";

type ScreenType = "menu" | "game" | "gameover";

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenType>("menu");

  const handleScreenChange = (newScreen: ScreenType) => {
    setScreen(newScreen);
  };

  return (
    <div className="App">
      {screen === "menu" && (
        <Menu startGame={() => handleScreenChange("game")} />
      )}
      {screen === "game" && (
        <Game endGame={() => handleScreenChange("gameover")} />
      )}
      {screen === "gameover" && (
        <GameOver goToMenu={() => handleScreenChange("menu")} />
      )}
    </div>
  );
};

export default App;
