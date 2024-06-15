export interface APIError {
  error: string;
  success: boolean;
}

export interface IStoreUser {
  _id: string;
  access_roles: string[];
  isSuperAdmin: boolean;
  full_name: string;
  name: string;
  username: string;
  email: string;
  age: string;
  profilePic: string;
  bio: string;
  followers: string[];
  following: string[];
  isFrozen: boolean;
  lat: number;
  long: number;
  ip: number;
  google_access_token: string;
  spotify_access_token: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

export interface IDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

interface IUser extends IDocument {
  full_name: string;
  username: string;
  age: string;
  email: string;
  profilePic: string;
  followers: any[];
  following: any[];
  bio: string;
  isFrozen: boolean;
  followed: boolean;
  lat: string;
  long: string;
  name: string;
  isSuperAdmin: boolean;
  spotify_access_token?: string;
}
