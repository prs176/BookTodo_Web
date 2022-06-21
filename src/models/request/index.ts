export interface JoinRequest {
  email: string;
  nick: string;
  password: string;
  birthday: string;
  goal: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RecordRequest {
  isbn: string;
  page: number;
}

export interface PlanRequest {
  days: number[];
}

export interface MyBookRequest {
  isbn: string;
  page: number;
}
