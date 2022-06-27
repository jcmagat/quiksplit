import { FriendCard } from "./FriendCard";

const friends = [
  { name: "Hector", expense: 50 },
  { name: "Juan", expense: 70 },
];

export function FriendsContainer() {
  return (
    <>
      {friends.map((friend) => (
        <FriendCard friend={friend} />
      ))}
    </>
  );
}
