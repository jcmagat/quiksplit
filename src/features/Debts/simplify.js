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

  // Finish the while loop when every number in amount is 0
  // (i.e. when all debts are settled)
  while (!amount.every((num) => Number(num.toFixed(2)) === 0)) {
    // console.log("before: ", amount);
    // console.log("creditor: ", creditorId, " | debtor: ", debtorId);
    // console.log(
    //   "credit: ",
    //   amount[creditorId].toFixed(2),
    //   " | debt: ",
    //   amount[debtorId].toFixed(2)
    // );

    const creditorId = getMax(amount);
    const debtorId = getMin(amount);

    // Determine the max that debtor has to pay the creditor
    const debt = Math.min(-amount[debtorId], amount[creditorId]);
    amount[creditorId] -= debt;
    amount[debtorId] += debt;

    // console.log(`${debtorId} pays ${creditorId}: $${debt}`);

    result.push({
      debtorId: debtorId,
      creditorId: creditorId,
      amount: debt,
    });

    // console.log("after: ", amount, `\n\n`);
  }

  return result;
}

export default simplify;
