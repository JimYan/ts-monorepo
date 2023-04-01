import React from "react";
import { Button } from "@mui/material";
import { useAtom, useAtomValue, PrimitiveAtom } from "jotai";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { todoAtomList, TodoType } from "../../../stores/todo";

import {
  count,
  totalMoney,
  initTotlaMoney,
  defaultTotlaMoney,
  asyncData,
  darkModeAtom,
} from "../../../stores/book";

const TodosItem = ({ todoAtom }: { todoAtom: PrimitiveAtom<TodoType> }) => {
  const todo = useAtomValue(todoAtom);

  return <li className="text-grey-800">{todo.task}</li>;
};

const Todos = () => {
  const [todoAtoms] = useAtom(todoAtomList);

  return (
    <div className="bg-red-200 p-2 text-grey-500 rounded-md">
      <h1>
        任务总数：
        <span className="text-red-500 font-semibold">{todoAtoms.length}</span>
      </h1>
      <ul>
        {todoAtoms.map((todoAtom) => (
          <TodosItem todoAtom={todoAtom} />
        ))}
      </ul>
    </div>
  );
};

const Detail = () => {
  const [value] = useAtom(count);
  const [total] = useAtom(totalMoney);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initTotal, setInitTotal] = useAtom(initTotlaMoney);
  const [defaultTotla, setDefaultTotlal] = useAtom(defaultTotlaMoney);
  //   const [asyncDataValue] = useAtom(asyncData);
  const [asyncDataValue] = useAtom(asyncData);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const upInitTotal = () => {
    setDefaultTotlal((pre) => pre + 1);
    setInitTotal(2);
    // setICount(1);
  };

  return (
    <div>
      <div className="text-center grid grid-cols-4 divide-x divide-green-500 mt-2.5">
        <p>总数:{value}</p>
        <p>总金额:{total}</p>
        <p>初始默认可变金额:{defaultTotla}</p>
        {asyncDataValue.state === "loading" && <div>...</div>}
        {asyncDataValue.state === "hasData" && (
          <div>异步数据{asyncDataValue.data}</div>
        )}
      </div>

      <div className="flex flex-row justify-end rounded-md bg-blue-200 pt-2 my-2.5">
        <FormControlLabel
          control={
            <Switch
              size="small"
              onChange={(event) => setDarkMode(event.target.checked)}
              checked={darkMode}
            />
          }
          label={darkMode ? "Dart" : "Light"}
        />
        <Button onClick={upInitTotal}>设置可变总金额</Button>
      </div>

      <Todos />
    </div>
  );
};

export default Detail;
