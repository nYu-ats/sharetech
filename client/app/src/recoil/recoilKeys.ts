// Keyの重複を防ぐため、KeySetとして管理
// 必ずrecoilKeysで定義されているkeyのみを使用する
const recoilKeys = ["currentUser", "authState"];

export const recoilKeySet = Object.fromEntries(recoilKeys.map((k) => [k, k])) as {
  [k in typeof recoilKeys[number]]: k;
};
