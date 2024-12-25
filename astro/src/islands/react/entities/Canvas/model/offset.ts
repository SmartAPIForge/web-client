import { atom } from "nanostores";

export type Offset = { x: number; y: number };

export const offsetStore = atom<Offset>({
  x: 0,
  y: 0,
});

export const setOffset = (x: number, y: number) => {
  offsetStore.set({ x, y });
};
