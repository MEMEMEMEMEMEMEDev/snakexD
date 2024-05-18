import React, { useEffect } from "react";
import { useBox, BoxProps } from "@react-three/cannon";

interface FoodProps {
  position: [number, number, number];
}

const createFoodProps = (position: [number, number, number]): BoxProps => ({
  mass: 0,
  position,
  args: [1, 1, 1],
  type: "Static",
});

const Food: React.FC<FoodProps> = ({ position }) => {
  const [ref, api] = useBox(() => createFoodProps(position));

  useEffect(() => {
    api.position.set(position[0], position[1], position[2]);
  }, [position, api.position]);

  return (
    // @ts-ignore
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Food;
