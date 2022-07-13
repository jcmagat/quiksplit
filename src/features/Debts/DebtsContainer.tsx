import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Friend } from "../../types";
import simplify from "./simplify";

interface Debt {
  debtorId: number; // person who owes the debt
  creditorId: number; // person to whom the debt is owed
  amount: number;
}

function DebtsContainer() {
  const friends = useSelector((state: RootState) => state.friends);

  const friendsEntries = Object.entries(friends) as [string, Friend][];
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
          creditorId: parseInt(id),
          amount: difference,
        });
      } else if (difference < 0) {
        debts.push({
          debtorId: parseInt(id),
          creditorId: parseInt(nextId),
          amount: Math.abs(difference),
        });
      }
    }
  }

  // ===================================
  const debtsAdjMatrix = friendsEntries.map(([debtorId, debtor]) =>
    friendsEntries.map(([creditorId, creditor]) => {
      if (debtorId === creditorId) return 0;

      return creditor.expense / count;
    })
  );

  // console.log(debtsAdjMatrix);

  const handleSimplify = () => {
    const debtsSimplified = simplify(debtsAdjMatrix);
    console.log(debtsSimplified);
  };
  // ===================================

  return (
    <>
      {count > 0 && (
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
                {`${friends[debt.debtorId].name} ➡ ${
                  friends[debt.creditorId].name
                }`}
                <span>{`$${debt.amount.toFixed(2)}`}</span>
              </li>
            ))}
          </ul>

          <button onClick={handleSimplify}>Simplify</button>
        </div>
      )}
    </>
  );
}

export default DebtsContainer;
