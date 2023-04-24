/* eslint-disable */
export interface BookBoDto {
  id: number;
  title: string;
  author: string;
}

export interface UserDto {
  email: string;
  name: string;
  uid: number;
}

export interface PageDto {
  pageIndex: number;
  pageCount: number;
  perpage: number;
}

export interface AllAccountDto {
  info: string;
}

export interface QueryAccountDto {
  name: string;
}

export interface ExtroBoOutputDto {
  nickname: string;
  sex: string;
  status: boolean;
  time: string;
}

export interface HeroBoOutputDto {
  id: number;
  name: string;
  extro: ExtroBoOutputDto;
}

export interface FindOneRespDto {
  code: number;
  msg: string;
  hero: HeroBoOutputDto;
}

export interface FindManyRespDto {
  code: number;
  msg: string;
  list: HeroBoOutputDto[];
}

export interface BaseResponseDto {
  code: number;
  message: string;
  tid: string;
  timestamp: string;
}

export namespace Ccache {
  /**
   * No description
   * @name TestCacheController
   * @request GET:/ccache
   * @response `200` `void`
   */
  export namespace TestCacheController {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Cache {
  /**
   * No description
   * @name GetCache
   * @request GET:/cache
   * @response `200` `string`
   */
  export namespace GetCache {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }
}

export namespace Account {
  /**
 * No description
 * @tags Account
 * @name Index2
 * @request GET:/account
 * @response `200` `(BaseResponseDto & {
    data?: BookBoDto,

})`
*/
  export namespace Index2 {
    export type RequestParams = {};
    export type RequestQuery = {
      name: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BaseResponseDto & {
      data?: BookBoDto;
    };
  } /**
 * No description
 * @tags Account
 * @name GetInfo
 * @request GET:/account/info
 * @response `200` `(BaseResponseDto & {
    data?: (PageDto & {
    list?: (UserDto)[],

}),

})`
*/
  export namespace GetInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      id: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BaseResponseDto & {
      data?: PageDto & {
        list?: UserDto[];
      };
    };
  }
  /**
   * No description
   * @tags Account
   * @name ErrorDemo
   * @request GET:/account/error
   * @response `200` `void`
   */
  export namespace ErrorDemo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Account
   * @name All
   * @request GET:/account/all
   * @response `200` `void`
   */
  export namespace All {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  } /**
 * No description
 * @tags Account
 * @name Error2
 * @request GET:/account/error2
 * @response `200` `(BaseResponseDto & {
    data?: string,

})`
*/
  export namespace Error2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BaseResponseDto & {
      data?: string;
    };
  } /**
 * No description
 * @tags Account
 * @name AllAccount
 * @request GET:/account/allAccount
 * @response `200` `(BaseResponseDto & {
    data?: AllAccountDto,

})`
*/
  export namespace AllAccount {
    export type RequestParams = {};
    export type RequestQuery = {
      name: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BaseResponseDto & {
      data?: AllAccountDto;
    };
  } /**
 * No description
 * @tags Account
 * @name UpdateUser
 * @request POST:/account/update
 * @response `200` `(BaseResponseDto & {
    data?: AllAccountDto,

})`
 * @response `201` `object`
*/
  export namespace UpdateUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryAccountDto;
    export type RequestHeaders = {};
    export type ResponseBody = BaseResponseDto & {
      data?: AllAccountDto;
    };
  }
}

export namespace Hero {
  /**
 * No description
 * @tags hero
 * @name FindHero
 * @request GET:/hero
 * @response `200` `(BaseResponseDto & {
    data?: FindOneRespDto,

})`
*/
  export namespace FindHero {
    export type RequestParams = {};
    export type RequestQuery = {
      age: number;
      id: number;
      name: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BaseResponseDto & {
      data?: FindOneRespDto;
    };
  } /**
 * No description
 * @tags hero
 * @name FindAccount
 * @request GET:/hero/getAccount
 * @response `200` `(BaseResponseDto & {
    data?: FindManyRespDto,

})`
*/
  export namespace FindAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BaseResponseDto & {
      data?: FindManyRespDto;
    };
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title nest openapi example
 * @version 1.0
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetHello
   * @request GET:/
   * @response `200` `string`
   */
  getHello = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: "GET",
      format: "json",
      ...params,
    });

  ccache = {
    /**
     * No description
     *
     * @name TestCacheController
     * @request GET:/ccache
     * @response `200` `void`
     */
    testCacheController: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/ccache`,
        method: "GET",
        ...params,
      }),
  };
  cache = {
    /**
     * No description
     *
     * @name GetCache
     * @request GET:/cache
     * @response `200` `string`
     */
    getCache: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/cache`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  account = {
    /**
 * No description
 *
 * @tags Account
 * @name Index2
 * @request GET:/account
 * @response `200` `(BaseResponseDto & {
    data?: BookBoDto,

})`
 */
    index2: (
      query: {
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResponseDto & {
          data?: BookBoDto;
        },
        any
      >({
        path: `/account`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Account
 * @name GetInfo
 * @request GET:/account/info
 * @response `200` `(BaseResponseDto & {
    data?: (PageDto & {
    list?: (UserDto)[],

}),

})`
 */
    getInfo: (
      query: {
        id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResponseDto & {
          data?: PageDto & {
            list?: UserDto[];
          };
        },
        any
      >({
        path: `/account/info`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name ErrorDemo
     * @request GET:/account/error
     * @response `200` `void`
     */
    errorDemo: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/account/error`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name All
     * @request GET:/account/all
     * @response `200` `void`
     */
    all: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/account/all`,
        method: "GET",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Account
 * @name Error2
 * @request GET:/account/error2
 * @response `200` `(BaseResponseDto & {
    data?: string,

})`
 */
    error2: (params: RequestParams = {}) =>
      this.request<
        BaseResponseDto & {
          data?: string;
        },
        any
      >({
        path: `/account/error2`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Account
 * @name AllAccount
 * @request GET:/account/allAccount
 * @response `200` `(BaseResponseDto & {
    data?: AllAccountDto,

})`
 */
    allAccount: (
      query: {
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResponseDto & {
          data?: AllAccountDto;
        },
        any
      >({
        path: `/account/allAccount`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Account
 * @name UpdateUser
 * @request POST:/account/update
 * @response `200` `(BaseResponseDto & {
    data?: AllAccountDto,

})`
 * @response `201` `object`
 */
    updateUser: (data: QueryAccountDto, params: RequestParams = {}) =>
      this.request<
        BaseResponseDto & {
          data?: AllAccountDto;
        },
        any
      >({
        path: `/account/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  hero = {
    /**
 * No description
 *
 * @tags hero
 * @name FindHero
 * @request GET:/hero
 * @response `200` `(BaseResponseDto & {
    data?: FindOneRespDto,

})`
 */
    findHero: (
      query: {
        age: number;
        id: number;
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BaseResponseDto & {
          data?: FindOneRespDto;
        },
        any
      >({
        path: `/hero`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags hero
 * @name FindAccount
 * @request GET:/hero/getAccount
 * @response `200` `(BaseResponseDto & {
    data?: FindManyRespDto,

})`
 */
    findAccount: (params: RequestParams = {}) =>
      this.request<
        BaseResponseDto & {
          data?: FindManyRespDto;
        },
        any
      >({
        path: `/hero/getAccount`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
