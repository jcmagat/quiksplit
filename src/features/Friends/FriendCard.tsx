import "./style.css";
import { useDispatch } from "react-redux";
import { edit } from "../../redux/friends";
import { useState } from "react";
import { Friend } from "../../types";

interface Props {
  friend: Friend;
}

export function FriendCard(props: Props) {
  const { friend } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  const [name, setName] = useState(friend.name);
  const [expense, setExpense] = useState(friend.expense);

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(edit({ id: friend.id, name: name, expense: expense }));
    setIsEditMode(false);
  };

  return (
    <div className="friend-card">
      {isEditMode ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="number"
            value={expense}
            onChange={(event) => setExpense(parseInt(event.target.value))}
          />

          <button onClick={handleSave}>save</button>
        </>
      ) : (
        <>
          <h5>{friend.name}</h5>
          <p>{friend.expense}</p>
          <button onClick={() => setIsEditMode(true)}>edit</button>
        </>
      )}
    </div>
  );
}
