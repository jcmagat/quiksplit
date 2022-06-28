import { useState } from "react";
import { FriendCard } from "./FriendCard";
import { Friend } from "../../types";

const myFriends: Friend[] = [
  { id: 0, name: "Hector", expense: 50 },
  { id: 1, name: "Juan", expense: 70 },
];

export function FriendsContainer() {
  const [friends, setFriends] = useState(myFriends);

  const handleAddFriend = () => {
    setFriends((prev) => [...prev, { id: 2, name: "hi", expense: 6 }]);
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
