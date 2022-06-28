import "./style.css";
import { useState } from "react";
import { Friend } from "../../types";

interface Props {
  friend: Friend;
}

export function FriendCard(props: Props) {
  const { friend } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="friend-card">
      {isEditMode ? (
        <>
          <input value={friend.name} type="text"></input>
          <input value={friend.expense} type="number"></input>
          <button onClick={() => setIsEditMode(false)}>save</button>
        </>
      ) : (
        <>
          <h5>{friend.name}</h5>
          <body>{friend.expense}</body>
          <button onClick={() => setIsEditMode(true)}>edit</button>
        </>
      )}
    </div>
  );
}
