import React from "react";
// import useSWR, { SWRConfig, preload } from "swr";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCommentList, ICommentItem } from "../../models/posts";

const Child = () => {
  const { data } = useQuery<Array<ICommentItem>>(["/comments"]);

  return (
    <div className="bg-blue-200 my-3 p-3">
      <h1>Child</h1>
      {data && <p>{data[1].body}</p>}
    </div>
  );
};

const List2 = () => {
  const { isLoading, data } = useQuery<Array<ICommentItem>>({
    queryKey: ["/comments"],
    queryFn: getCommentList,
    // refetchInterval: 1000,
  });

  return (
    <div className="bg-blue-200 my-3 p-3">
      <span>List2 Load</span>
      {isLoading && <span>loading...</span>}
      {data &&
        data.map((item) => (
          <div>
            <Link to={`/user/comment/${item.id}`}>id:{item.id}</Link>
            <p>body:{item.body}</p>
          </div>
        ))}
    </div>
  );
};

const Comment = () => {
  const { isLoading, data } = useQuery<Array<ICommentItem>>({
    queryKey: ["/comments"],
    // queryFn: getCommentList,
    // refetchInterval: 1000,
  });

  return (
    <div className="px-5">
      <span>asd</span>
      {isLoading && <span>loading...</span>}
      {data && (
        <div>
          <p>id:{data[0].id}</p>
          <p>body:{data[0].body}</p>
        </div>
      )}

      <Child />
      <List2 />
    </div>
  );
};

const Box = () => (
  <>
    {/* // <SWRConfig
  //   value={{
  //     revalidateOnFocus: false, // focus后继续请求
  //   }}
  // > */}
    <Comment />
    {/* </SWRConfig> */}
  </>
);

export default Box;
