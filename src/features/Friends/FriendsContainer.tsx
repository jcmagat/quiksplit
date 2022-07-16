import { useDispatch } from "react-redux";
import { useFriends } from "../../redux/store";
import { addFriend } from "../../redux/friends";
import { FriendCard } from "./FriendCard";

export function FriendsContainer() {
  const friends = useFriends();

  const dispatch = useDispatch();

  const handleAddFriend = () => {
    dispatch(addFriend({ friend: { name: "Name", expense: 0 } }));
  };

  return (
    <div className="friends-container">
      {Object.entries(friends).map(([id, friend]) => (
        <FriendCard key={id} id={parseInt(id)} friend={friend} />
      ))}

      <button className="friend-add" onClick={handleAddFriend}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
