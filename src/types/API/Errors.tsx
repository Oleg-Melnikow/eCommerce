export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: ErrorObject[];
  errorDescription?: string;
  errorMessage?: string;
}

interface ErrorObject {
  code: string;
  message: string;
}
