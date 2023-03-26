import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { getPostList } from "../../models/posts";

const User = () => {
  const params = useParams();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const [lists, setLists] = useState<{ title: string }[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getPostList().then((resp) => {
      console.log(resp);
      setLists(resp);
    });
    // setLists(list);
  }, []);

  return (
    <div>
      <span>Info:{params.id}</span>
      <Link to="/user" className="mr-2">
        User首页
      </Link>
      <Link to="/">APP 首页</Link>

      <Button variant="outlined" onClick={goHome}>
        回首页
      </Button>
      <span>{lists.length > 0 ? lists[0].title : ""}</span>
    </div>
  );
};

export default User;
