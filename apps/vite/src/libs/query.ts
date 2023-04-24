/* eslint-disable padding-line-between-statements */
import {
  // QueryFunctionContext
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";

export interface IResp<T = unknown> {
  code: number;
  message: string;
  data: T;
}
export type IError = Omit<IResp, "data">;

let prefix = "/";

// eslint-disable-next-line no-return-assign
export const setPrefix = (path: string) => (prefix = path);
export const getRealUrl = (uri: string) => `${prefix}${uri}`;

// 默认的query函数
export const defaultFetch = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const uri = queryKey[0];
  const resp = await fetch(getRealUrl(uri as string));

  return resp.json();
};

// 查询类请求
export const query = async <T = unknown>(uri: string) => {
  const info = await fetch(getRealUrl(uri));

  if (info.status !== 200) {
    throw new Error("请求错误");
  }

  return (await info.json()) as unknown as T;
};

// POST类请求
export const post = async <T = unknown, B = unknown>(uri: string, body: B) => {
  const info = await fetch(getRealUrl(uri), {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (info.status !== 200) {
    throw new Error("请求错误");
  }

  return info.json() as unknown as T;
};
