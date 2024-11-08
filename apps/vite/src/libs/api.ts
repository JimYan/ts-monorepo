/* eslint-disable no-shadow-restricted-names */
// import { Api as ApiImpl, RequestParams } from "./api.impl";
import { Api as ApiImpl, RequestParams } from "@nighttrax/api/src/api.impl";
import { useQuery, useMutation } from "@tanstack/react-query";

console.log("asdf");
console.log(import.meta.env);

export const Api = new ApiImpl({
  // baseUrl: "http://127.0.0.1:3001",
  baseUrl: import.meta.env.VITE_API_PATH,
});

export function useQueryApi<FN extends (..._arguments_: any[]) => any>(
  fn: FN,
  queryKey?: string[],
  ...restOfname: Parameters<FN>
) {
  type FunReturnType = Awaited<ReturnType<typeof fn>>;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isError, isFetched, isLoading, isSuccess } =
    useQuery<FunReturnType>({
      queryKey,
      queryFn: async (): Promise<FunReturnType> => fn(...restOfname),
    });

  return { data, isError, isFetched, isLoading, isSuccess };
}

type FirstArgumentType<T> = T extends (arg1: infer U, ...args: any[]) => any
  ? U
  : never;

export function useMutationApi<FN extends (..._arguments_: any[]) => any>(
  fn: FN
) {
  type FunReturnType = Awaited<ReturnType<typeof Api.account.updateUser>>;
  type FirstType = FirstArgumentType<typeof fn>;
  const { mutate, data, isLoading, isError, error, isSuccess, status } =
    useMutation<FunReturnType, any, FirstType, any>(
      async (data: FirstType, params: RequestParams = {}) => {
        const resp = fn(data, params) as Promise<FunReturnType>;

        return resp;
      }
    );

  return { data, isLoading, isError, error, isSuccess, status, mutate };
}
