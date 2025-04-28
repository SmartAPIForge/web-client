import { atom } from "nanostores";

const nameStore = atom<string>("");

export const Project = {
  name: {
    store: nameStore,
    set: (name: string) => {
      nameStore.set(name);
    },
  },
};
