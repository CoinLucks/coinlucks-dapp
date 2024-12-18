const platformFee = 350;

export const calculateMultiplier = (start: number, end: number) => {
  const base = 100;
  const feeMultiplier = 10000 - platformFee;
  return (((base / (end - start + 1)) * feeMultiplier) / 10000).toFixed(2);
};

export const calculateChance = (start: number, end: number) => {
  return (((end - start + 1) / 100) * 100).toFixed(0);
};
