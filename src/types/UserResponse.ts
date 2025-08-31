export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface PageResponse {
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
}

export interface PaginationResponse<T> {
  code: number;
  status: string;
  data: T[];
  paging: PageResponse;
}
