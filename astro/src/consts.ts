export const CONSTS = {
  CONTRIBUTORS_LINK: "https://github.com/orgs/SmartAPIForge/people",
  GITHUB_ORG_LINK: "https://github.com/SmartAPIForge",
  NAMES: {
    MAX_CHARACTERS: 20,
  },
  ZOOM: {
    MAX: 5,
    MIN: 0.2,
    DEFAULT: 1,
    // Example usage: next_zoom = current_zoom * COEFFICIENT ** delta (y scroll),
    COEFFICIENT: 0.999,

    UPDATE: {
      DEBOUNCE: 300,
      MAX_WAIT: 300,
      DIFF_FOR_IMMEDIATE: 0.15,
    },
  },
  CANVAS: {
    GRID: {
      GAP: 100,
      LINE: {
        STROKE: "#ccc",
        STROKE_WIDTH: 0.3,
      },
    },
  },
  API_URL: import.meta.env.PUBLIC_API,
};
