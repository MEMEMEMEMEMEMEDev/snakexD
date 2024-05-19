import React from "react";
import { useBox, BoxProps } from "@react-three/cannon";
import { Mesh } from "three";

interface BorderProps extends BoxProps {
  position: [number, number, number];
  args: [number, number, number];
}

const WALL_COLOR = "green";
const WALL_THICKNESS = 0.2;

const createBorderProps = (
  position: [number, number, number],
  args: [number, number, number]
): BorderProps => ({
  mass: 0,
  position,
  args,
  type: "Static",
});

const Borders: React.FC = () => {
  const size = 9;
  const offset = 0.5;
  const wallHeight = 2;
  const floorHeight = 1;

  const borders: BorderProps[] = [
    createBorderProps(
      [0, size + WALL_THICKNESS / 2 + offset, wallHeight / 2 - floorHeight],
      [size * 2 + WALL_THICKNESS, WALL_THICKNESS, wallHeight]
    ),
    createBorderProps(
      [0, -size - WALL_THICKNESS / 2 - offset, wallHeight / 2 - floorHeight],
      [size * 2 + WALL_THICKNESS, WALL_THICKNESS, wallHeight]
    ),
    createBorderProps(
      [-size - WALL_THICKNESS / 2 - offset, 0, wallHeight / 2 - floorHeight],
      [WALL_THICKNESS, size * 2 + WALL_THICKNESS, wallHeight]
    ),
    createBorderProps(
      [size + WALL_THICKNESS / 2 + offset, 0, wallHeight / 2 - floorHeight],
      [WALL_THICKNESS, size * 2 + WALL_THICKNESS, wallHeight]
    ),
  ];

  const [top] = useBox<Mesh>(() => borders[0]);
  const [bottom] = useBox<Mesh>(() => borders[1]);
  const [left] = useBox<Mesh>(() => borders[2]);
  const [right] = useBox<Mesh>(() => borders[3]);

  const floorProps: BoxProps = {
    mass: 0,
    position: [0, 0, -floorHeight],
    args: [
      size * 2 + WALL_THICKNESS * 2 + offset * 2,
      size * 2 + WALL_THICKNESS * 2 + offset * 2,
      WALL_THICKNESS,
    ],
    type: "Static",
  };
  const [floor] = useBox<Mesh>(() => floorProps);

  return (
    <>
      <mesh ref={floor} castShadow receiveShadow>
        <boxGeometry
          args={[
            size * 2 + WALL_THICKNESS * 2 + offset * 2,
            size * 2 + WALL_THICKNESS * 2 + offset * 2,
            WALL_THICKNESS,
          ]}
        />
        <meshStandardMaterial color="#a9a9a9" />
      </mesh>
      <mesh ref={top}>
        <boxGeometry
          args={[size * 2 + WALL_THICKNESS, WALL_THICKNESS, wallHeight]}
        />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh ref={bottom}>
        <boxGeometry
          args={[size * 2 + WALL_THICKNESS, WALL_THICKNESS, wallHeight]}
        />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh ref={left}>
        <boxGeometry
          args={[WALL_THICKNESS, size * 2 + WALL_THICKNESS, wallHeight]}
        />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh ref={right}>
        <boxGeometry
          args={[WALL_THICKNESS, size * 2 + WALL_THICKNESS, wallHeight]}
        />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
    </>
  );
};

export default Borders;
