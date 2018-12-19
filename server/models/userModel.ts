export interface BaseUser {
  id?: number;
  Username?: string;
  Password?: string;
  Email?: string;
  regCode?: string;
  Verified?: boolean;
}

export interface User extends BaseUser {
  token?: string;
}
