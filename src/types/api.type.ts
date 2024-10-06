export interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  errorSources?: IErrorSource[];
  error?: string;
}

export interface IErrorSource {
  path: string;
  message: string;
}

export type IQueryParam = {
  name: string;
  value: boolean | React.Key;
};
