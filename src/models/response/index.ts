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
  BookId: number;
  UserId: number;
}

export interface PlanData {
  id: number;
  day: number;
  UserId: number;
}

export interface MyBookData {
  id: number;
  UserId: number;
  isbn: string;
  page: number;
}

export interface MyBookRecordData {
  id: number;
  UserId: number;
  isbn: string;
  page: number;
  Records: RecordData[];
}

export interface KakaoResponse {
  meta: Meta;
  documents: BookData[];
}

interface Meta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

export interface BookData {
  authors: string[];
  contents: string;
  datetime: Date;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}
