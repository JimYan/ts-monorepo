import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { Button } from "@mui/material";

import Detail from "./components/detail";
import Todos from "./components/todo";
import { count } from "../../stores/book";

const User = () => {
  const [value, setValue] = useAtom(count);

  const add = function () {
    setValue((pre) => pre + 1);
  };

  return (
    <div>
      <Button variant="outlined" onClick={add}>
        +1
      </Button>
      <p>总数：{value}</p>
      <Detail />
      <Todos />
      <Link to="info/100" className="mr-3">
        去info
      </Link>
      <Link to="comment" className="mr-2">
        comments
      </Link>
    </div>
  );
};

export default User;
