import React, { useEffect, useState } from "react";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useStore } from "../../hooks/useStore";
import {
  dirtImg,
  glassImg,
  grassImg,
  logImg,
  woodImg,
} from "../../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();
  const textures = {
    dirt,
    grass,
    glass,
    wood,
    log,
  };

  useEffect(() => {
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);

    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [dirt, grass, glass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => clearTimeout(visibilityTimeout);
  }, [activeTexture]);

  if (visible) {
    return (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([key, imgSrc]) => {
          return (
            <img
              alt={`a block of ${key} from minecraft`}
              src={imgSrc}
              key={key}
              className={`${key === activeTexture ? "active" : null}`}
            />
          );
        })}
      </div>
    );
  }
  return null;
};

export { TextureSelector };
