import { useDispatch } from "react-redux";
import { editFriend, deleteFriend } from "../../redux/friends";
import { useEffect, useState } from "react";
import { Friend } from "../../types";

interface Props {
  index: number;
  friend: Friend;
}

export function FriendCard(props: Props) {
  const { index, friend } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  const [emoji, setEmoji] = useState(friend.emoji);
  const [name, setName] = useState(friend.name);
  const [expense, setExpense] = useState(friend.expense);

  useEffect(() => {
    setEmoji(friend.emoji);
    setName(friend.name);
    setExpense(friend.expense);
  }, [friend.emoji, friend.name, friend.expense]);

  const dispatch = useDispatch();

  const handleSave = (event: any) => {
    event.preventDefault();

    dispatch(editFriend({ index, friend: { emoji, name, expense } }));
    setIsEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteFriend({ index }));
    setIsEditMode(false);
  };

  if (isEditMode) {
    return (
      <form className="friend-card" onSubmit={handleSave}>
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

        <button type="submit">
          <i className="fa-solid fa-check"></i>
        </button>

        <button type="button" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </form>
    );
  }

  return (
    <div className="friend-card">
      <div className="friend-identity">
        <span>{friend.emoji}</span>
        <h5>{friend.name}</h5>
      </div>

      <p>{`$${friend.expense.toFixed(2)}`}</p>

      <button onClick={() => setIsEditMode(true)}>
        <i className="fa-solid fa-pen"></i>
      </button>
    </div>
  );
}
