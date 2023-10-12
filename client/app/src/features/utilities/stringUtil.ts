export const generateRandomString = (digit: number = 8): string => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(Array(digit))
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join("");
};
