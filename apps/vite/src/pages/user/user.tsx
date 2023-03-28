import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { Button } from "@mui/material";

import Detail from "./components/detail";
import Todos from "./components/todo";
import { count } from "../../stores/book";
import { setItem, getItem } from "../../libs/Cache";

const User = () => {
  const [value, setValue] = useAtom(count);

  // setItem("testkey", { a: "av", b: "bv" }, 10);

  const v = getItem<{ a: string; b: string }>("testkey");

  const add = function () {
    setValue((pre) => pre + 1);
  };

  return (
    <div>
      <Button variant="outlined" onClick={add}>
        +1
      </Button>
      <p>缓存：{v ? v.a : ""}</p>
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
