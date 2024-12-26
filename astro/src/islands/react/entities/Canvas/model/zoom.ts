import { CONSTS } from "@/consts";
import lodash from "lodash";
import { atom } from "nanostores";

export type Zoom = number;

export const zoomStore = atom<Zoom>(CONSTS.ZOOM.DEFAULT);

export const debouncedSetZoom = (zoom: Zoom) => {
  const current = zoomStore.get();
  if (current === zoom) return;

  const debounced = lodash.debounce(
    () => {
      zoomStore.set(zoom);
    },
    CONSTS.ZOOM.UPDATE.DEBOUNCE,
    { maxWait: CONSTS.ZOOM.UPDATE.MAX_WAIT },
  );

  if (
    Math.abs(zoom - current) / current >
    CONSTS.ZOOM.UPDATE.DIFF_FOR_IMMEDIATE
  ) {
    zoomStore.set(zoom);
    debounced.cancel();
  } else {
    debounced();
  }
};
