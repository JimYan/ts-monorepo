// import { Button } from "@nighttrax/components";
import { meaningOfLife } from "@nighttrax/foo";
import React, { useState } from "react";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { Api, useQueryApi, useMutationApi } from "../../libs/api";
import "./App.css";

const label = { inputProps: { "aria-label": "Switch demo" } };

const App = () => {
  const [count, setCount] = useState(meaningOfLife);
  const { data, isLoading } = useQueryApi(
    Api.account.allAccount,
    ["account", "Allaccount"],
    {
      name: "jimyantest",
    }
  );

  const { data: error2 } = useQueryApi(Api.account.error2, [
    "account2",
    "error2",
  ]);

  const { data: data3 } = useQueryApi(
    Api.account.getInfo,
    ["account2", "error3"],
    { id: 3 }
  );

  const { data: hero } = useQueryApi(Api.hero.findHero, ["hero", "findhero"], {
    age: 2,
    id: 2,
    name: "jim",
  });

  // const {data,isLoading} = useQuery({queryKey:["asdf"],queryFn:Api.account.allAccount})
  const {
    data: mdata,
    isLoading: misloading,
    mutate,
  } = useMutationApi(Api.account.updateUser);
  // data

  return (
    <div className="App px-2">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <p>
          code:{isLoading ? "..." : ""} {data?.data?.info}
        </p>
        <p>{error2?.data}</p>
        <p>
          {data3?.data?.list &&
            data3?.data?.list?.length > 0 &&
            data3?.data?.list[0].email}
        </p>
        <p>
          m:{misloading ? "..." : ""} {mdata?.data?.info}
          <button
            type="button"
            onClick={() => {
              mutate({ name: "jimyanasdf" });
            }}
          >
            加载
          </button>
        </p>

        <p>hero:{hero?.data?.hero.name}</p>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Switch {...label} size="small" color="warning" />
        <Button />
        <Button
          variant="outlined"
          className="text-3xl"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <p className="text-3xl text-red-500">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        <Link to="/about" className="mr-2">
          About
        </Link>
        <span className="mr-2 text-gray-800">|</span>
        <Link to="/user" className="mr-5">
          User
        </Link>
      </p>
    </div>
  );
};

export default App;
