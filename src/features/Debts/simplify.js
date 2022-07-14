function getMin(arr) {
  return arr.indexOf(Math.min(...arr));
}

function getMax(arr) {
  return arr.indexOf(Math.max(...arr));
}

// Given a set of persons as graph
// where graph[i][j] indicates
// the amount that person i needs to
// pay person j, this function
// finds and prints the minimum
// cash flow to settle all debts.
function simplify(graph) {
  if (graph.length < 2) return graph;

  let amount = Array(graph.length).fill(0);

  // Calculate the net amount to
  // be paid to person 'p', and
  // stores it in amount[p]. The
  // value of amount[p] can be
  // calculated by subtracting
  // debts of 'p' from credits of 'p'
  for (let p = 0; p < amount.length; p++) {
    for (let i = 0; i < amount.length; i++) {
      amount[p] += graph[i][p] - graph[p][i];
    }
  }

  let result = [];

  let creditorId = getMax(amount);
  let debtorId = getMin(amount);

  while (
    Number(amount[creditorId].toFixed(2)) !== 0 ||
    Number(amount[debtorId].toFixed(2)) !== 0
  ) {
    // console.log("before: ", amount);
    // console.log("creditor: ", creditorId, " | debtor: ", debtorId);
    // console.log(
    //   "credit: ",
    //   amount[creditorId].toFixed(2),
    //   " | debt: ",
    //   amount[debtorId].toFixed(2)
    // );

    // Determine the max that debtor has to pay the creditor
    let debt = Math.min(-amount[debtorId], amount[creditorId]);
    amount[creditorId] -= debt;
    amount[debtorId] += debt;

    // console.log(`${debtorId} pays ${creditorId}: $${debt}`);

    result.push({
      debtorId: debtorId,
      creditorId: creditorId,
      amount: debt,
    });

    // console.log("after: ", amount, `\n\n`);

    creditorId = getMax(amount);
    debtorId = getMin(amount);
  }

  return result;
}

export default simplify;
