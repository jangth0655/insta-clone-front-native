export interface IUser {
  avatar: string;
  bio: string;
  createdAt: string;
  email: string;
  firstName: string;
  followers: string;
  following: string;
  id: number;
  isFollowing: boolean;
  isMe: boolean;
  lastName: string;
  photos: SeeFeedItems[];
  totalFollowers: number;
  totalFollowing: number;
  updatedA: string;
  username: string;
}

export interface IComment {
  id: number;
  payload: string;
  isMine: boolean;
  createdAt: string;
  user: IUser;
}

export interface IPhoto {
  id: number;
  user: IUser;
  file: any;
  caption: string;
  likes: number;
  comments: IComment[];
  commentNumber: number;
  createdAt: number;
  isMine: boolean;
  isLiked: boolean;
}

export interface SeeFeedItems {
  seeFeed: IPhoto[];
}

export interface SeeFeedItem {
  id: number;
  user: IUser;
  file: any;
  caption: string;
  likes: number;
  comments: IComment[];
  commentNumber: number;
  createdAt: number;
  isMine: boolean;
  isLiked: boolean;
}

export interface IMessage {
  id: number;
  payload: string;
  users: IUser;
  room: IRoom;
  read: boolean;
}

export interface IRoom {
  id: number;
  users: IUser[];
  unreadTotal: number;
  messages: IMessage[];
}
