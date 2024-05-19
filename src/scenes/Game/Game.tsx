import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Snake from "../../components/Snake";
import Food from "../../components/Food";
import Borders from "../../components/Borders";

interface IGame {
  endGame: () => void;
}

const CAMERA_POSITION: [number, number, number] = [0, -35, 20];
const CAMERA_TARGET: [number, number, number] = [0, 0, 0];
const ZOOM = 2;

const Game: React.FC<IGame> = ({ endGame }) => {
  const boardSize = 9;
  const [snakePositions, setSnakePositions] = useState<
    [number, number, number][]
  >([
    [0, 0, 0],
    [0, -1, 0],
    [0, -2, 0],
  ]);

  const generateNewFoodPosition = (): [number, number, number] => {
    let newPosition: [number, number, number];
    do {
      newPosition = [
        Math.floor(Math.random() * (boardSize * 2 + 1)) - boardSize,
        Math.floor(Math.random() * (boardSize * 2 + 1)) - boardSize,
        0,
      ];
    } while (
      snakePositions.some(
        (pos) => pos[0] === newPosition[0] && pos[1] === newPosition[1]
      )
    );
    return newPosition;
  };

  const [foodPosition, setFoodPosition] = useState<[number, number, number]>(
    generateNewFoodPosition()
  );

  const handleEatFood = () => {
    const newPosition = generateNewFoodPosition();
    setFoodPosition(newPosition);
  };

  const updateSnakePositions = (newPositions: [number, number, number][]) => {
    setSnakePositions(newPositions);
  };

  return (
    <div className="game">
      <Canvas
        shadows // Habilitar soporte de sombras en el Canvas
        camera={{
          position: CAMERA_POSITION,
          fov: 75,
          near: 0.1,
          far: 1000,
          zoom: ZOOM,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(CAMERA_TARGET[0], CAMERA_TARGET[1], CAMERA_TARGET[2]);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[0, -2, 1]} // Asegúrate de que la posición sea óptima para tu escena
          intensity={1}
          castShadow
          shadow-mapSize-width={2048} // Aumenta para mejorar la calidad de la sombra
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-10} // Ajusta según el tamaño de tu escena
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Physics>
          <Snake
            endGame={endGame}
            foodPosition={foodPosition}
            onEatFood={handleEatFood}
            onUpdatePositions={updateSnakePositions}
          />
          <Food position={foodPosition} />
          <Borders />
        </Physics>
      </Canvas>
      <div className="controls">
        <button onClick={endGame}>End Game</button>
      </div>
    </div>
  );
};

export default Game;
