import Comments from "./screens/Comments";
import Feed from "./screens/Feed";
import Me from "./screens/Me";
import Notification from "./screens/Notifications";
import Photo from "./screens/Photo";
import Profile from "./screens/Profile";
import Search from "./screens/Search";

export type RootStackParamList = {
  Photo:
    | {
        photoId: number;
      }
    | undefined;
  Profile:
    | {
        username?: string;
        id?: number;
      }
    | undefined;
  Likes: { photoId: number } | undefined;
  Comments: undefined;
  TakePhoto: undefined;
  UploadForm:
    | {
        file: string;
      }
    | undefined;
  Tabs: undefined;
  Room: {} | undefined;
};

export type ScreenRootStackParamList = {
  Feed:
    | {
        file: any;
      }
    | undefined;
  Me: undefined;
  Notification: undefined;
  Search: undefined;
  Profile:
    | {
        username?: string;
        id?: number;
      }
    | undefined;
  Photo:
    | {
        photoId: number;
      }
    | undefined;
  Comments: undefined;
  Upload: undefined;
  TakePhoto: undefined;
  UploadForm:
    | {
        file: string;
      }
    | undefined;
  Tabs: undefined;
  Messages: {} | undefined;
  Rooms:
    | {
        [key: string]: any;
      }
    | undefined;
  Room:
    | {
        [key: string]: any;
      }
    | undefined;
};
