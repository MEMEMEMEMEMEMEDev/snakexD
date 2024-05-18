import React, { useEffect, useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import usePlayerControls from "../hooks/usePlayerControls";

interface SnakeProps {
  endGame: () => void;
  foodPosition: [number, number, number];
  onEatFood: () => void;
  onUpdatePositions: (positions: [number, number, number][]) => void;
}

const Snake: React.FC<SnakeProps> = ({
  endGame,
  foodPosition,
  onEatFood,
  onUpdatePositions,
}) => {
  const [position, setPosition] = useState<[number, number, number][]>([
    [0, 0, 0],
    [0, -1, 0],
    [0, -2, 0],
  ]);
  const direction = useRef<[number, number, number]>([0, 1, 0]);
  const nextDirection = useRef<[number, number, number]>([0, 1, 0]);
  const [isGameOver, setIsGameOver] = useState(false);
  const controls = usePlayerControls();
  const speed = 0.03;
  const time = useRef(0);

  useEffect(() => {
    onUpdatePositions(position);
  }, [position, onUpdatePositions]);

  const handleControlChange = useCallback(() => {
    const { up, down, left, right } = controls;
    const [x, y] = direction.current;
    if (up && y === 0) nextDirection.current = [0, 1, 0];
    if (down && y === 0) nextDirection.current = [0, -1, 0];
    if (left && x === 0) nextDirection.current = [-1, 0, 0];
    if (right && x === 0) nextDirection.current = [1, 0, 0];
  }, [controls]);

  useEffect(() => {
    handleControlChange();
  }, [handleControlChange]);

  useFrame((_, delta) => {
    if (isGameOver) return;

    time.current += delta;
    if (time.current > speed) {
      time.current = 0;
      moveSnake();
    }
  });

  const moveSnake = () => {
    direction.current = [...nextDirection.current];
    const newHead = position[0].map(
      (pos, idx) => pos + direction.current[idx]
    ) as [number, number, number];

    checkCollision(newHead);
    updateSnakePosition(newHead);
  };

  const checkCollision = (newHead: [number, number, number]) => {
    if (
      newHead[0] <= -10 ||
      newHead[0] >= 10 ||
      newHead[1] <= -10 ||
      newHead[1] >= 10
    ) {
      setIsGameOver(true);
      endGame();
    } else if (newHead.every((value, idx) => value === foodPosition[idx])) {
      onEatFood();
      setPosition((prev) => [newHead, ...prev]);
    } else if (
      position.some((segment) =>
        newHead.every((value, idx) => value === segment[idx])
      )
    ) {
      setIsGameOver(true);
      endGame();
    }
  };

  const updateSnakePosition = (newHead: [number, number, number]) => {
    setPosition((prev) => {
      const newPositions = [newHead, ...prev.slice(0, -1)];
      onUpdatePositions(newPositions);
      return newPositions;
    });
  };

  return (
    <>
      {position.map((pos, index) => (
        <mesh key={index} position={pos}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
    </>
  );
};

export default Snake;
