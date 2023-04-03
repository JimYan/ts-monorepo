import React from "react";
// import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { Button } from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import Detail from "./components/detail";
import Todos from "./components/todo";
import { count } from "../../stores/book";
import { setItem, getItem } from "@nighttrax/lib";

const User = () => {
  const [value, setValue] = useAtom(count);

  const [tabNow, setTabs] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabs(newValue);
  };

  setItem("testkey", { a: "av", b: "bv" }, 10);

  const v = getItem<{ a: string; b: string }>("testkey");
  console.log(v);

  const add = function () {
    setValue((pre) => pre + 1);
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-7/12 lg:pr-4">
          <div className="text-center grid grid-cols-3 divide-x divide-green-500 border-b pb-1 mx-10 border-red-100">
            <div>
              <Button variant="outlined" className="w-2" onClick={add}>
                +1
              </Button>
            </div>
            <p className="mt-2 text-red-400">缓存：{v ? v.a : "Null"}</p>
            <p className="mt-2 text-red-500">总数：{value}</p>
          </div>

          <Detail />

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabNow}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Item One" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="Item Three" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Item On1e</TabPanel>
              <TabPanel value="2">Item Tw2o</TabPanel>
              <TabPanel value="3">Item Thrasee</TabPanel>
            </TabContext>
          </Box>
        </div>
        <div className="lg:w-5/12 lg:pl-4">
          <Todos />
        </div>
      </div>
    </div>
  );
};

export default User;
