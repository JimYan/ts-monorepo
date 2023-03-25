import React from "react";
import { Outlet } from "react-router-dom";

const User = () => (
  <div>
    <h1>User</h1>
    <Outlet />
  </div>
);

export default User;
