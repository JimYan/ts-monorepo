/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable padding-line-between-statements */
/* eslint-disable arrow-body-style */
// import { getRealUrl } from "./util";
import { useState } from "react";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import type { SetOptional } from "type-fest";
// import { IResp, query, post } from "./util";
import { IResp, query, post } from "@nighttrax/lib";

export type ICommentItem = {
  id: number;
  body: string;
  postId: number;
};
export type IPostItem = {
  id: number;
  title: string;
};
export type IAddCommentItem = SetOptional<ICommentItem, "id" | "postId">;

export const getPostList = async () => {
  const resp = await query<IPostItem[]>("/posts");
  return resp;
};

export const getPostItem = async ({
  queryKey,
}: QueryFunctionContext<[string, { id: string }]>) => {
  const [, { id }] = queryKey;
  const info = await query<IPostItem>(`/posts/${id}`);
  return info;
};

// 无限加载的model
export const getCommentListByCursor = async ({ pageParam = 1 }) => {
  const resp = await query<Array<ICommentItem>>(
    `/comments?_limit=6&_page=${pageParam}`
  );
  return {
    data: resp,
    nextId: pageParam < 2 ? pageParam + 1 : null,
  };
};

export const getCommentList = async ({
  queryKey,
}: QueryFunctionContext<[string, { page: number }]>) => {
  const [, { page }] = queryKey;
  const resp = await query<Array<ICommentItem>>(
    `/comments?_limit=12&_page=${page}`
  );
  return resp;
};

export const getCommentsItem = async ({
  queryKey,
}: QueryFunctionContext<[string, { id: string }]>) => {
  const [, { id }] = queryKey;
  const info = await query<ICommentItem>(`/comments/${id}`);

  return info;
};

export const getCommentsListPages = (nowPage = 0) => {
  const [page, setPage] = useState(nowPage);
  const { status, data, isLoading, isFetching } = useQuery(
    ["commentsList", { page }],
    getCommentList,
    { enabled: page > 0, keepPreviousData: true }
  );

  return {
    page,
    setPage,
    status,
    data,
    isLoading,
    isFetching,
    totalPage: 2, // 总页数
  };
};

export const addComments = async (item: IAddCommentItem) => {
  const info = await post<IResp<string>>("/comments/add", item);
  return info;
};
