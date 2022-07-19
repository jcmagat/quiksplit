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

  const dispatch = useDispatch();

  const handleNameChange = (event: any) => {
    event.preventDefault();

    dispatch(editFriend({ index, friend: { emoji, name, expense } }));
    setIsEditNameMode(false);
  };

  const handleExpenseChange = (event: any) => {
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
            <form onSubmit={handleNameChange}>
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
          <form onSubmit={handleExpenseChange}>
            <input
              type="number"
              value={expense}
              onChange={(event) => setExpense(parseInt(event.target.value))}
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
