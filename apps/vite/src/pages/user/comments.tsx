/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
import React from "react";
// import useSWR, { SWRConfig, preload } from "swr";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  // getCommentList,
  ICommentItem,
  getCommentsListPages,
  getCommentListByCursor,
} from "../../models/posts";
import { Button } from "@mui/material";

const Child = () => {
  const { data } = useQuery<Array<ICommentItem>>(["/comments"]);

  return (
    <div className="bg-blue-200 p-3 w-full">
      <h1>Child</h1>
      {data && <p>{data[1].body}</p>}
    </div>
  );
};

const List3 = () => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["commentsCursor"],
      queryFn: getCommentListByCursor,

      getNextPageParam: (lastPage) => {
        // 下一页的cursorID
        return lastPage.nextId;
      },
    });

  return (
    <div className=" bg-red-300 ml-3 w-full p-2">
      <span>无限加载Demo</span>
      {isLoading && <span>loading...</span>}
      {data &&
        data.pages.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.data.map((item) => (
              <div>
                <Link to={`/user/comment/${item.id}`}>id:{item.id}</Link>
                <p>body:{item.body}</p>
              </div>
            ))}
          </React.Fragment>
        ))}
      <div className="mt-2">
        <Button
          variant="outlined"
          className="mr-5"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => {
            fetchNextPage();
          }}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </div>
    </div>
  );
};

const List2 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nowPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string, 10)
    : 1;

  const { isLoading, data, page, totalPage, setPage, isFetching } =
    getCommentsListPages(nowPage);

  return (
    <div className="bg-blue-200 ml-3 p-3 w-full">
      <span>List2 Load</span>
      {isLoading && <span>loading...</span>}
      {isFetching ? <span> Loading...</span> : null}
      {data &&
        data.map((item) => (
          <div>
            <Link to={`/user/comment/${item.id}`}>id:{item.id}</Link>
            <p>body:{item.body}</p>
          </div>
        ))}
      <div className="mt-2">
        <Button
          variant="outlined"
          className="mr-5"
          disabled={page <= 1}
          onClick={() => {
            navigate(`/user/comment?page=${page - 1}`);
            setPage((p) => p - 1);
          }}
        >
          上一页
        </Button>

        <Button
          variant="outlined"
          disabled={page >= totalPage}
          onClick={() => {
            navigate(`/user/comment?page=${page + 1}`);
            setPage((p) => p + 1);
          }}
        >
          下一页
        </Button>
      </div>
    </div>
  );
};

const Comment = () => {
  const { isLoading, data } = useQuery<Array<ICommentItem>>({
    queryKey: ["/comments"],
  });

  return (
    <div className="px-5">
      {isLoading && <span>loading...</span>}
      {data && (
        <div>
          <p>id:{data[0].id}</p>
          <p>body:{data[0].body}</p>
        </div>
      )}
      <div className="flex justify-start mt-2">
        <Child />
        {/* <>分页</> */}
        <List2 />
        {/* <无限加载></无限加载> */}
        <List3 />
      </div>
    </div>
  );
};

export default Comment;
