import React from "react";
import useSWR, { SWRConfig, preload } from "swr";
import { getCommentList } from "../../models/posts";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());
preload("http://127.0.0.1:3000/comments", getCommentList);

const Child = () => {
  const { data } = useSWR("http://127.0.0.1:3000/comments", getCommentList);

  return (
    <div>
      <h1>Child</h1>
      {data && <p>{data[0].body}</p>}
    </div>
  );
};

const Comment = () => {
  // const { data, isLoading } = useSWR<{ body: string }[]>(
  //   "http://127.0.0.1:3000/comments",
  //   fetcher
  // );

  const { data, isLoading } = useSWR(
    "http://127.0.0.1:3000/comments",
    getCommentList
  );

  return (
    <div>
      <span>asd</span>
      {isLoading && <span>loading...</span>}
      {data && (
        <div>
          <p>id:{data[0].id}</p>
          <p>body:{data[0].body}</p>
        </div>
      )}
      <Child />
    </div>
  );
};

const Box = () => (
  <SWRConfig
    value={{
      revalidateOnFocus: false, // focus后继续请求
    }}
  >
    <Comment />
  </SWRConfig>
);

export default Box;
