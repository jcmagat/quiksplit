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

  const [isEditMode, setIsEditMode] = useState(true);

  const [emoji, setEmoji] = useState(friend.emoji);
  const [name, setName] = useState(friend.name);
  const [expense, setExpense] = useState(friend.expense);

  useEffect(() => {
    setEmoji(friend.emoji);
    setName(friend.name);
    setExpense(friend.expense);
  }, [friend.emoji, friend.name, friend.expense]);

  const handleChangeExpense = (event: any) => {
    let val = parseFloat(event.target.value);
    val = Number.isNaN(val) ? 0 : val;

    setExpense(val);
  };

  // ========== Redux ==========
  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    dispatch(editFriend({ index, friend: { emoji, name, expense } }));
    setIsEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteFriend({ index }));
    setIsEditMode(false);
  };

  return (
    <>
      {isEditMode ? (
        <form className="friend-card" onSubmit={handleSubmit}>
          <div className="friend-card-content">
            <h1>{friend.emoji}</h1>

            <input
              className="friend-card-name"
              type="text"
              autoFocus
              placeholder={name}
              onChange={(event) => setName(event.target.value)}
            />

            <input
              type="number"
              step={0.01}
              min={0}
              max={999999.99}
              value={expense}
              onChange={handleChangeExpense}
            />
          </div>

          <div className="friend-card-buttons">
            <button type="button" onClick={handleDelete}>
              <i className="fa-solid fa-trash-can"></i>
            </button>

            <button type="submit">
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </form>
      ) : (
        <div className="friend-card" onClick={() => setIsEditMode(true)}>
          <div className="friend-card-content">
            <h1>{friend.emoji}</h1>

            <h2 className="friend-card-name">{friend.name}</h2>

            <span>{`$${friend.expense.toFixed(2)}`}</span>
          </div>
        </div>
      )}
    </>
  );
}
