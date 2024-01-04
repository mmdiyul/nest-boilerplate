export interface CommonResponse<T> {
  data: T;
  message: string;
  detail: string;
  statusCode: number;
}

export interface CommonPageResponse<T> {
  data: T[];
  message: string;
  detail: string;
  statusCode: number;
}
