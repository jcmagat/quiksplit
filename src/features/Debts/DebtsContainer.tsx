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
          <h2 className="debts-title">
            Total
            <span>{`$${total.toFixed(2)}`}</span>
          </h2>

          <p className="debts-subtitle">
            Each person spent
            <span>{`$${(total / count).toFixed(2)}`}</span>
          </p>

          <ol className="debts-list">
            <p>To evenly split expenses</p>

            {debts.map((debt, index) => (
              <li key={index}>
                <span>
                  {`${friends[debt.debtorId]?.emoji} ${
                    friends[debt.debtorId]?.name
                  }`}

                  <i className="fa-solid fa-angle-right"></i>

                  {`${friends[debt.creditorId]?.emoji} ${
                    friends[debt.creditorId]?.name
                  }`}

                  <span className="debts-list-amount">
                    {`$${debt.amount.toFixed(2)}`}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <button className="debts-simplify" onClick={handleSimplify}>
            {isSimplified ? "Simplified" : "Simplify"}
          </button>
        </div>
      )}
    </>
  );
}

export default DebtsContainer;
