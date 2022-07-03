import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DebtCard from "./DebtCard";

interface Debt {
  debtorId: number; // person who owes the debt
  debteeId: number; // person to whom the debt is owed
  debt: number;
}

function DebtsContainer() {
  const friends = useSelector((state: RootState) => state.friends);

  const friendsEntries = Object.entries(friends);
  const count = Object.keys(friends).length;

  let debts = [] as Debt[];

  for (let i = 0; i < friendsEntries.length; i++) {
    const [id, friend] = friendsEntries[i];

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
      {debts.map((debt, index) => (
        <DebtCard
          key={index}
          debtorName={friends[debt.debtorId].name}
          debteeName={friends[debt.debteeId].name}
          debt={debt.debt}
        />
      ))}
    </div>
  );
}

export default DebtsContainer;
