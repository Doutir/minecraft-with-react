import { Triplet, useBox } from "@react-three/cannon";
import { Ref, useState } from "react";
import { Mesh } from "three";
import { useStore } from "../../hooks/useStore";

import * as textures from "../../images/textures";

type CubeProps = {
  position: Triplet;
  texture: string;
};
const Cube = ({ position, texture }: CubeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const activeTexture =
    textures[(texture + "Texture") as keyof typeof textures];

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(Number(e.faceIndex) / 2);
        const x = Number(ref.current?.position.x);
        const y = Number(ref.current?.position.y);
        const z = Number(ref.current?.position.z);
        if (e.nativeEvent.ctrlKey) {
          removeCube(x, y, z);
        } else {
          switch (clickedFace) {
            case 0:
              addCube(x + 1, y, z);
              break;
            case 1:
              addCube(x - 1, y, z);
              break;
            case 2:
              addCube(x, y + 1, z);
              break;
            case 3:
              addCube(x, y - 1, z);
              break;
            case 4:
              addCube(x, y, z + 1);
              break;
            case 5:
              addCube(x, y, z - 1);
              break;
            default:
              break;
          }
        }
      }}
      ref={ref as Ref<Mesh>}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "grey" : "white"}
        attach="material"
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        map={activeTexture}
      />
    </mesh>
  );
};

export { Cube };
