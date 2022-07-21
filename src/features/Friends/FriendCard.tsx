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

  const [emoji, setEmoji] = useState(friend.emoji);

  const [name, setName] = useState(friend.name);
  const [isEditNameMode, setIsEditNameMode] = useState(false);

  const [expense, setExpense] = useState(friend.expense);
  const [isEditExpenseMode, setIsEditExpenseMode] = useState(false);

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

  const handleSubmitName = (event: any) => {
    event.preventDefault();

    dispatch(editFriend({ index, friend: { emoji, name, expense } }));
    setIsEditNameMode(false);
  };

  const handleSubmitExpense = (event: any) => {
    event.preventDefault();

    dispatch(editFriend({ index, friend: { emoji, name, expense } }));
    setIsEditExpenseMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteFriend({ index }));
    setIsEditNameMode(false);
    setIsEditExpenseMode(false);
  };

  return (
    <div className="friend-card-container">
      <div className="friend-card">
        <div className="friend-identity">
          <span>{friend.emoji}</span>

          {isEditNameMode ? (
            <form onSubmit={handleSubmitName}>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </form>
          ) : (
            <h5 onClick={() => setIsEditNameMode(true)}>{friend.name}</h5>
          )}
        </div>

        {isEditExpenseMode ? (
          <form onSubmit={handleSubmitExpense}>
            <input
              type="number"
              step={0.01}
              min={0}
              max={999999.99}
              value={expense}
              onChange={handleChangeExpense}
            />
          </form>
        ) : (
          <p
            onClick={() => setIsEditExpenseMode(true)}
          >{`$${friend.expense.toFixed(2)}`}</p>
        )}
      </div>

      <button className="friend-delete" onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
