import { useCallback, useEffect, useState } from "react";

function actionByKey(key: string) {
  const keyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };

  return keyActionMap[key as keyof typeof keyActionMap];
}

const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prevState) => ({
        ...prevState,
        [action]: true,
      }));
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prevState) => ({
        ...prevState,
        [action]: false,
      }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
  return actions;
};

export { useKeyboard };
