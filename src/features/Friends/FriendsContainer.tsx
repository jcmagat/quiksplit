import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/friends";
import { Friend } from "../../types";
import { FriendCard } from "./FriendCard";

interface State {
  friends: Friend[];
}

export function FriendsContainer() {
  const friends = useSelector((state: State) => state.friends);

  const dispatch = useDispatch();

  const handleAddFriend = () => {
    dispatch(add({ id: 3, name: "hello", expense: 22 }));
  };

  return (
    <div className="friends-container">
      {friends.map((friend: any) => (
        <FriendCard friend={friend} />
      ))}

      <button onClick={handleAddFriend}>+</button>
    </div>
  );
}
