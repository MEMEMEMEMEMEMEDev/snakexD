import { useEffect, useState, useCallback } from "react";

interface Controls {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  jump: boolean; // Agregar soporte para salto
}

const usePlayerControls = (): Controls => {
  const [movement, setMovement] = useState<Controls>({
    up: false,
    down: false,
    left: false,
    right: false,
    jump: false, // Inicializar el estado del salto
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
        setMovement((m) => ({ ...m, up: true }));
        break;
      case "KeyS":
        setMovement((m) => ({ ...m, down: true }));
        break;
      case "KeyA":
        setMovement((m) => ({ ...m, left: true }));
        break;
      case "KeyD":
        setMovement((m) => ({ ...m, right: true }));
        break;
      case "Space": // Reconocer la barra espaciadora
        setMovement((m) => ({ ...m, jump: true }));
        break;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
        setMovement((m) => ({ ...m, up: false }));
        break;
      case "KeyS":
        setMovement((m) => ({ ...m, down: false }));
        break;
      case "KeyA":
        setMovement((m) => ({ ...m, left: false }));
        break;
      case "KeyD":
        setMovement((m) => ({ ...m, right: false }));
        break;
      case "Space": // Reconocer cuando la barra espaciadora se suelta
        setMovement((m) => ({ ...m, jump: false }));
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return movement;
};

export default usePlayerControls;
