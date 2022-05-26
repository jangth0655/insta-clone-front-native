import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    payload
    isMine
    createdAt
    user {
      username
      avatar
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isFollowing
    isMe
  }
`;

export const FEED_PHOTO = gql`
  ${PHOTO_FRAGMENT}
  fragment FeedFragment on Photo {
    ...PhotoFragment
    user {
      id
      username
      avatar
    }
    caption

    createdAt
    isMine
  }
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomFragment on Room {
    id
    unreadTotal
    users {
      id
      username
      avatar
    }
  }
`;

export const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on Room {
    id
    payload
    users {
      username
      avatar
    }
    read
  }
`;
