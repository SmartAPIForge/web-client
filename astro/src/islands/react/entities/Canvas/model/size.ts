import { atom } from "nanostores";

export type Size = { width: number; height: number };

export const sizeStore = atom<Size>({
  width: 0,
  height: 0,
});

export const setSize = (width: number, height: number) => {
  sizeStore.set({ width, height });
};
