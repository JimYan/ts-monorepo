import { Button } from "@nighttrax/components/button";
import { meaningOfLife } from "@nighttrax/foo";
import React, { useState } from "react";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";

import Mb from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import "./App.css";

const label = { inputProps: { "aria-label": "Switch demo" } };

const App = () => {
  const [count, setCount] = useState(meaningOfLife);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Switch {...label} size="small" color="warning" />
        <Button />
        <Mb
          variant="outlined"
          className="text-3xl"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Mb>
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
