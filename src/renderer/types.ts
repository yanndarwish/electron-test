export type Login = {
  email: string;
  password: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type JobStatus =
  | 'pending'
  | 'ghosted'
  | 'rejected'
  | 'interview'
  | 'test'
  | 'revived';
