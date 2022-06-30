import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Debt {
  debtee: number; // person to whom debt is owed
  debtor: number; // person who owes debt
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
          debtee: parseInt(id),
          debtor: parseInt(nextId),
          debt: difference,
        });
      } else if (difference < 0) {
        debts.push({
          debtee: parseInt(nextId),
          debtor: parseInt(id),
          debt: Math.abs(difference),
        });
      }
    }
  }

  return (
    <>
      {debts.map((debt, index) => (
        <div key={index}>
          <h2>{`${friends[debt.debtor].name} owes ${
            friends[debt.debtee].name
          } \$${debt.debt}`}</h2>
        </div>
      ))}
    </>
  );
}

export default DebtsContainer;
