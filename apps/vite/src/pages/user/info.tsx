import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const User = () => {
  const params = useParams();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div>
      Info:{params.id}
      <Link to="/user" className="mr-2">
        User首页
      </Link>
      <Link to="/">APP 首页</Link>
      <Button variant="outlined" onClick={goHome}>
        回首页
      </Button>
    </div>
  );
};

export default User;
