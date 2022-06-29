export interface Friend {
  name: string;
  expense: number;
}

export interface FriendMap {
  [id: number]: Friend;
}
