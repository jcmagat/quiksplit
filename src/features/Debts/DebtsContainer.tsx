import { useState, useEffect } from "react";
import { useFriends } from "../../redux/store";
import simplify from "./simplify";

interface Debt {
  debtorId: number; // person who owes the debt
  creditorId: number; // person to whom the debt is owed
  amount: number;
}

function DebtsContainer() {
  const friends = useFriends();

  const count = friends.length;
  const total = friends.reduce((accumulator, friend) => {
    return accumulator + friend.expense;
  }, 0);

  const [debtsAdjMatrix, setDebtsAdjMatrix] = useState<number[][]>([[]]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isSimplified, setIsSimplified] = useState(false);

  useEffect(() => {
    const matrix = friends.map((debtor, debtorIndex) =>
      friends.map((creditor, creditorIndex) => {
        if (debtorIndex === creditorIndex) return 0;

        return creditor.expense / count;
      })
    );

    setDebtsAdjMatrix(matrix);
  }, [friends, count]);

  useEffect(() => {
    let debtsAccumulated = [] as Debt[];

    for (let i = 0; i < debtsAdjMatrix.length; i++) {
      for (let j = i + 1; j < debtsAdjMatrix.length; j++) {
        const difference = debtsAdjMatrix[i][j] - debtsAdjMatrix[j][i];
        if (difference > 0) {
          debtsAccumulated.push({
            debtorId: i,
            creditorId: j,
            amount: difference,
          });
        } else if (difference < 0) {
          debtsAccumulated.push({
            debtorId: j,
            creditorId: i,
            amount: Math.abs(difference),
          });
        }
      }
    }

    setDebts(debtsAccumulated);
    setIsSimplified(false);
  }, [debtsAdjMatrix]);

  const handleSimplify = () => {
    if (isSimplified) return;

    const debtsSimplified = simplify(debtsAdjMatrix);
    setDebts(debtsSimplified);
    setIsSimplified(true);
  };

  return (
    <>
      {debts.length > 0 && (
        <div className="debts-container">
          <h4 className="debts-title">
            Total expenses
            <span>{`$${total.toFixed(2)}`}</span>
          </h4>

          <p className="debts-subtitle">
            Each person pays
            <span>{`$${(total / count).toFixed(2)}`}</span>
          </p>

          <ul className="debts-list">
            {debts.map((debt, index) => (
              <li key={index}>
                {`${friends[debt.debtorId]?.name} ➡ ${
                  friends[debt.creditorId]?.name
                }`}
                <span>{`$${debt.amount.toFixed(2)}`}</span>
              </li>
            ))}
          </ul>

          <button className="debts-simplify" onClick={handleSimplify}>
            {isSimplified ? "Simplified" : "Simplify"}
          </button>
        </div>
      )}
    </>
  );
}

export default DebtsContainer;
