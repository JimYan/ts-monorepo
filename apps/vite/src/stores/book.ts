import { atom } from "jotai";
import { atomWithDefault, loadable, atomWithStorage } from "jotai/utils";

const darkModeAtom = atomWithStorage("darkMode", true);

const count = atom(1); // 可变数据
const price = atom(10); // 可变数据
const totalMoney = atom((get) => get(count) * get(price)); // 不可变数据，总金额。

const defaultTotlaMoney = atomWithDefault((get) => get(totalMoney)); // 可变数据，初始值为总金额。

// 设置一个可变数据，初始值是总金额+1； 但是具体的应用场景还未思考明白。
const initTotlaMoney = atom(
  (get) => get(totalMoney) + 1,
  (get, set, newValue: number) => {
    set(count, newValue);
  }
);

const asyncData = loadable(
  atom<Promise<number>>(async () => {
    let init = 1;

    return new Promise((reslove) => {
      setTimeout(() => {
        init = 5;
        reslove(init);
      }, 1000);
    });
  })
);

export const test = (b: number) => {
  const a = 1;

  return a + b;
};

export {
  count,
  price,
  totalMoney,
  defaultTotlaMoney,
  initTotlaMoney,
  asyncData,
  darkModeAtom,
};
