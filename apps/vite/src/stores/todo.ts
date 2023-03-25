import { atom } from "jotai";
import { splitAtom } from "jotai/utils";

type TodoType = {
  task: string;
  done: boolean;
};

const initialState: TodoType[] = [
  {
    task: "help the town",
    done: false,
  },
  {
    task: "feed the dragon",
    done: false,
  },
];

const todosAtom = atom(initialState);
// 分裂出新的 atom list
const todoAtomList = splitAtom(todosAtom);

// type TodoType = (typeof initialState)[number];
export { todoAtomList };

export type { TodoType };
