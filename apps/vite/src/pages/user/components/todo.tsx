import React from "react";
import { useAtom, PrimitiveAtom } from "jotai";
import { TodoType, todoAtomList } from "../../../stores/todo";
import { Button } from "@mui/material";

const Info = ({
  todoAtom,
  remove,
}: {
  todoAtom: PrimitiveAtom<TodoType>;
  remove: () => void;
}) => {
  const [todo, setTodo] = useAtom(todoAtom);

  return (
    <div>
      <input
        value={todo.task}
        onChange={(e) => {
          setTodo((oldValue) => ({ ...oldValue, task: e.target.value }));
        }}
      />
      <Button variant="outlined" onClick={remove}>
        remove
      </Button>
    </div>
  );
};

const Todos = () => {
  const [todoAtoms, dispatch] = useAtom(todoAtomList);

  return (
    <div className="bg-blue-200 mt-2">
      <h1>todo</h1>
      <ul>
        {todoAtoms.map((todoAtom) => (
          <Info
            todoAtom={todoAtom}
            remove={() => dispatch({ type: "remove", atom: todoAtom })}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
