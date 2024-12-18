export class ApiRsp<T = void> {
  state: boolean;

  code?: number;

  message?: string;

  hasNext?: boolean;

  page?: number;

  data?: T extends void ? any : T;

  constructor(
    _state: boolean,
    _code?: number,
    _message?: string,
    _data?: any,
    _hasNext?: boolean,
    _page?: number
  ) {
    this.state = _state ?? true;
    this.code = _code ?? 200;
    this.message = _message;
    this.data = _data;
    this.hasNext = _hasNext;
    this.page = _page;
  }

  static Success<T = void>(_data?: any, hasNext?: boolean, page?: number) {
    return new ApiRsp<T>(true, 200, undefined, _data, hasNext, page);
  }

  static Error(error: any) {
    return new ApiRsp(false, error.code, error.message);
  }

  static Throw(error: any, params?: any) {
    throw new Error(error, params);
  }
}

export function formatApiRsp(result: any) {
  let queryError: string | undefined = undefined;
  if (result.data?.pages) {
    result.data?.pages.forEach((it: any) => {
      if (it.state == false) {
        queryError = it.message;
      }
    });
  } else if (result.data?.state == false) {
    queryError = result.data?.message;
  }

  return { ...result, queryError: queryError };
}
