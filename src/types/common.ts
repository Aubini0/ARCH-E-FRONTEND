import type { Editor } from "@tiptap/core";
import type { EditorView } from "@tiptap/pm/view";
import type { EditorState } from "@tiptap/pm/state";

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
  rating: number;
  ratingGiven: boolean;
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

export interface IQueryInHistory {
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

export interface ISessionInHistory {
  id: string;
  session_id: string;
  session_name: string;
}

export interface ICreateNote {
  text: string;
  x_position: number;
  y_position: number;
  z_position: number;
}

export interface INote extends ICreateNote {
  note_id: string;
}

export interface LinkProps {
  url: string;
  text?: string;
  openInNewTab?: boolean;
}

export interface ShouldShowProps {
  editor: Editor;
  view: EditorView;
  state: EditorState;
  oldState?: EditorState;
  from: number;
  to: number;
}

export interface FormatAction {
  label: string;
  icon?: React.ReactNode;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  canExecute: (editor: Editor) => boolean;
  shortcuts: string[];
  value: string;
}

export interface ITask {
  text: string;
  is_done: boolean;
  order: number;
  deadline_time:
    | {
        start?: string;
        end?: string;
      }
    | undefined;
}

export interface IFullTask extends ITask {
  _id: string;
}

export interface FileMetadata {
  _id: string;
  file_name: string;
  user_id: string;
  file_url: string;
  file_server_path: string;
  folder_id: string | null;
  position_x: number;
  rotation: number;
  position_y: number;
  position_z: number;
  createdAt: string;
  updatedAt: string;
}
