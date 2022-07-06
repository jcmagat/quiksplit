import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Debt {
  debtorId: number; // person who owes the debt
  debteeId: number; // person to whom the debt is owed
  debt: number;
}

function DebtsContainer() {
  const friends = useSelector((state: RootState) => state.friends);

  const friendsEntries = Object.entries(friends);
  const count = Object.keys(friends).length;

  let total = 0;

  let debts = [] as Debt[];

  for (let i = 0; i < friendsEntries.length; i++) {
    const [id, friend] = friendsEntries[i];

    total += friend.expense;

    const expense = friend.expense / count;

    for (let j = i; j < friendsEntries.length; j++) {
      const [nextId, nextFriend] = friendsEntries[j];

      const nextExpense = nextFriend.expense / count;

      const difference = expense - nextExpense;

      if (difference > 0) {
        debts.push({
          debtorId: parseInt(nextId),
          debteeId: parseInt(id),
          debt: difference,
        });
      } else if (difference < 0) {
        debts.push({
          debtorId: parseInt(id),
          debteeId: parseInt(nextId),
          debt: Math.abs(difference),
        });
      }
    }
  }

  return (
    <div className="debts-container">
      <h4 className="debts-title">
        Total expenses:
        <span>{`$${total.toFixed(2)}`}</span>
      </h4>

      <p className="debts-subtitle">
        Each person pays
        <span>{`$${(total / count).toFixed(2)}`}</span>
      </p>

      <ul className="debts-list">
        {debts.map((debt, index) => (
          <li key={index}>
            {`${friends[debt.debtorId].name} ➡ ${friends[debt.debteeId].name}`}
            <span>{`$${debt.debt.toFixed(2)}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DebtsContainer;
