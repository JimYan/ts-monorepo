import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsItem } from "../../models/posts";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { AddComment } from "./addcomment";

const ItemNext = () => {
  // const params = useParams();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery<{ body: string }>({
    queryKey: ["/comments/1"],
    placeholderData: {
      body: "asdf",
    },
  });

  console.log(queryClient.getQueryData(["/comments/1"])); // 获取缓存
  // console.log(data);

  return (
    <div className=" bg-green-200 mt-2 p-2">
      {isLoading && <>loading...</>}
      {data && <p>body: {data.body}</p>}
    </div>
  );
};

const Item = () => {
  const params = useParams();
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["commentsItem", { id: params.id as string }],
    queryFn: getCommentsItem,
    enabled: true,
  });

  return (
    <>
      <Button onClick={() => refetch()}>加载数据</Button>
      {isLoading && <div>loading...</div>}
      {isError && <>error...</>}
      {data && <div className="p-5 bg-green-200">body:{data.body}</div>}
      <ItemNext />
      <div className="bg-red-200 m-3 p-3">
        <AddComment />
      </div>
    </>
  );
};

export default Item;
