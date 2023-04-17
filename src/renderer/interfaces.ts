export interface IJob {
  company: string;
  position: string;
  link: string;
}

export interface IJobResponse extends IJob {
  status: string;
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiErrorResponse {
  status: number;
  data: { msg: string };
}

export function isApiResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    typeof (error as any).status === 'number'
  );
}
