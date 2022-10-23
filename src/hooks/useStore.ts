import { Triplet } from "@react-three/cannon";
import { nanoid } from "nanoid";
import create from "zustand";

type Cube = {
  key: string;
  pos: Triplet;
  texture: string;
};
interface IStoreState {
  texture: string;
  cubes: Cube[];
  addCube(x: number, y: number, z: number): void;
  removeCube(x: number, y: number, z: number): void;
  setTexture(texture: string): void;
  saveWorld(): void;
  resetWorld(): void;
}

const getLocalStorage = (key: string) => {
  const rawItem = window.localStorage.getItem(key);
  return rawItem ? JSON.parse(rawItem) : null;
};

const setLocalStorage = (key: string, value: unknown) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create<IStoreState>((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [],
  addCube: (x, y, z) => {
    set((prevState) => ({
      cubes: [
        ...prevState.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prevState.texture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prevState) => ({
      cubes: prevState.cubes.filter((cube) => {
        const [posX, posY, posZ] = cube.pos;
        return x !== posX || y !== posY || z !== posZ;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((prevState) => {
      setLocalStorage("cubes", prevState.cubes);
      return prevState;
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
