export const getRandomSoftColor = (): string => {
  const getSoftValue = () => Math.floor(Math.random() * 128 + 127);
  const r = getSoftValue();
  const g = getSoftValue();
  const b = getSoftValue();
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;

  const newColor = (
    0x1000000 +
    (R < 0 ? 0 : R > 255 ? 255 : R) * 0x10000 +
    (G < 0 ? 0 : G > 255 ? 255 : G) * 0x100 +
    (B < 0 ? 0 : B > 255 ? 255 : B)
  )
    .toString(16)
    .slice(1);

  return `#${newColor}`;
};
