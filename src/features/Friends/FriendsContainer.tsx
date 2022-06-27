import { useState } from "react";
import { FriendCard } from "./FriendCard";

const myFriends: Friend[] = [
  { name: "Hector", expense: 50 },
  { name: "Juan", expense: 70 },
];
export interface Friend {
  name?: string;
  expense?: number;
}

export function FriendsContainer() {
  const [friends, setFriends] = useState(myFriends);

  const handleAddFriend = () => {
    setFriends((prev) => [...prev, { name: "hi", expense: 6 }]);
  };

  return (
    <div className="friends-container">
      {friends.map((friend) => (
        <FriendCard friend={friend} />
      ))}

      <button onClick={handleAddFriend}>+</button>
    </div>
  );
}
