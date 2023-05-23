const recoilKeys = ["currentUser", "authState"];

export const recoilKeySet = Object.fromEntries(recoilKeys.map((k) => [k, k])) as {
  [k in typeof recoilKeys[number]]: k;
};
