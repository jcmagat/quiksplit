import { useDispatch } from "react-redux";
import { useFriends } from "../../redux/store";
import { addFriend } from "../../redux/friends";
import { FriendCard } from "./FriendCard";

const emojis = [
  "💀",
  "💩",
  "🤡",
  "👹",
  "👺",
  "👻",
  "👽",
  "👾",
  "🤖",
  "😈",
  "💀",
];
const randomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export function FriendsContainer() {
  const friends = useFriends();

  const dispatch = useDispatch();

  const handleAddFriend = () => {
    dispatch(
      addFriend({ friend: { emoji: randomEmoji(), name: "Name", expense: 0 } })
    );
  };

  return (
    <div className="friends-container">
      {friends.map((friend, index) => (
        <FriendCard key={index} index={index} friend={friend} />
      ))}

      <button onClick={handleAddFriend}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
