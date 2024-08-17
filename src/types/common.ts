export interface APIError {
  message: string;
  error?: string;
  success: boolean;
}

export interface IStoreUser {
  id: string;
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

export interface IUser extends IDocument {
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

export interface IBotSearchResponseStream {
  event_type: "on_tool_start" | "on_tool_end" | "on_llm_stream";
  name: "SerpAPI" | "llm";
  data?: string;
}

export interface IQuery {
  id: string;
  query: string;
  response: string;
  completed: boolean;
  recommendations: string[];
  videos: IVideo[];
  videosFetched: boolean;
  web_links: string[];
}

export interface IVideo {
  title: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
  };
  video_link: string;
}

export interface APIResponse<T> {
  status: boolean;
  data: T;
}

export interface ISession {
  user_id: string;
  session_id: string;
  assistant: string;
  user: string;
  created_at: string;
  id: string;
  metadata: {
    recommendations: string[];
    recomendations: string[];
    web_links: string[];
    youtube_results: IVideo[];
  };
}
