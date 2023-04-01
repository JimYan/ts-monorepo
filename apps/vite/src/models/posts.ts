/* eslint-disable padding-line-between-statements */
/* eslint-disable arrow-body-style */
// import { getRealUrl } from "./util";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { SetOptional } from "type-fest";
import { IResp, query, post } from "./util";

export type ICommentItem = {
  id: number;
  body: string;
  postId: number;
};
export type IPostItem = {
  id: number;
  title: string;
};
export type IAddCommentItem = SetOptional<ICommentItem, "id">;

export const getPostList = async () => {
  const resp = await query<IPostItem>("/posts");
  return resp;
};

export const getPostItem = async ({
  queryKey,
}: QueryFunctionContext<[string, { id: string }]>) => {
  const [, { id }] = queryKey;
  const info = await query<IPostItem>(`/posts/${id}`);
  return info;
};

export const getCommentList = async () => {
  const resp = await query<Array<ICommentItem>>("/comments");
  return resp;
};

export const getCommentsItem = async ({
  queryKey,
}: QueryFunctionContext<[string, { id: string }]>) => {
  const [, { id }] = queryKey;
  const info = await query<ICommentItem>(`/comments/${id}`);

  return info;
};

export const addComments = async (item: IAddCommentItem) => {
  const info = await post<IResp<string>>("/comments/add", item);
  return info;
};
