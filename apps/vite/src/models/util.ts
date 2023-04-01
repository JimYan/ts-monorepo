import {
  // QueryFunctionContext
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";

export const getRealUrl = (uri: string) =>
  `${import.meta.env.VITE_API_PATH}${uri}`;

export interface IResp<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export type IError = Omit<IResp, "data">;

export const defaultFetch = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const uri = queryKey[0];
  const resp = await fetch(getRealUrl(uri as string));

  return resp.json();
};

export const query = async <T = unknown>(uri: string) => {
  const info = await fetch(getRealUrl(uri));

  if (info.status !== 200) {
    throw new Error("请求错误");
  }

  return (await info.json()) as unknown as T;
};

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
