export interface MessageResponse {
  code: number;
  message: string;
}

export interface Response<T> {
  code: number;
  message: string;
  response: T;
}

export interface RecordData {
  id: number;
  page: number;
  date: Date;
  isbn: string;
  UserId: number;
}

export interface PlanData {
  id: number;
  day: number;
  UserId: number;
}

export interface BookData {
  id: number;
  UserId: number;
  isbn: string;
}

export interface BookRecordData {
  id: number;
  UserId: number;
  isbn: string;
  Records: RecordData[];
}
