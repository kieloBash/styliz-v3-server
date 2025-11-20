export interface BaseResponseDTO<T> {
  payload: T;
  message: string[] | string;
  success: boolean;
  error: string;
  code: number;
}
