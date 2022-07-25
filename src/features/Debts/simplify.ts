interface Debt {
  debtorId: number; // person who owes the debt
  creditorId: number; // person to whom the debt is owed
  amount: number;
}

function getMin(arr: number[]) {
  return arr.indexOf(Math.min(...arr));
}

function getMax(arr: number[]) {
  return arr.indexOf(Math.max(...arr));
}

/**
 * Simplifies a debt adjacency matrix
 *
 * @param graph - The adjacency matrix (i.e. graph[i][j] is debt owed by i to j)
 * @returns The minimum debts after simplification
 */
function simplify(graph: number[][]): Debt[] {
  let results = [] as Debt[];

  // expenses[i] is the sum of (debt owed to i - debt owed by i)
  // A negative number means i is a debtor
  // A positive number means i is a creditor
  let expenses = Array<number>(graph.length).fill(0);

  for (let i = 0; i < graph.length; i++) {
    // If matrix is not symmetric
    if (graph[i].length !== graph.length) return [];

    // If graph contains NaN
    // or if graph contains a negative number
    if (graph[i].some((num) => Number.isNaN(num) || num < 0)) return [];

    // If graph is valid, construct expenses
    for (let j = 0; j < graph.length; j++) {
      expenses[i] += graph[j][i] - graph[i][j];
    }
  }

  // Finish the while loop when <2 numbers in expenses are non-zero
  // (i.e. when all debts are settled)
  while (expenses.filter((num) => Number(num.toFixed(2)) !== 0).length > 1) {
    const debtorId = getMin(expenses);
    const creditorId = getMax(expenses);
    const debt = Math.min(-expenses[debtorId], expenses[creditorId]);

    // Debtor pays creditor whichever is less:
    // - debt owed by debtor
    // - debt owed to creditor
    expenses[debtorId] += debt;
    expenses[creditorId] -= debt;

    results.push({
      debtorId: debtorId,
      creditorId: creditorId,
      amount: debt,
    });
  }

  console.log(expenses);

  return results;
}

export default simplify;
