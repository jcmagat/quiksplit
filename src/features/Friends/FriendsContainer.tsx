import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/friends";
import { FriendMap } from "../../types";
import { FriendCard } from "./FriendCard";

interface State {
  friends: FriendMap;
}

export function FriendsContainer() {
  const friends = useSelector((state: State) => state.friends);

  const dispatch = useDispatch();

  const handleAddFriend = () => {
    dispatch(add({ name: "Name", expense: 0 }));
  };

  return (
    <div className="friends-container">
      {Object.values(friends).map((friend, index) => (
        <FriendCard key={index} friend={friend} />
      ))}

      <button onClick={handleAddFriend}>+</button>
    </div>
  );
}
