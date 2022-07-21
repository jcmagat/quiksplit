function getMin(arr: number[]) {
  return arr.indexOf(Math.min(...arr));
}

function getMax(arr: number[]) {
  return arr.indexOf(Math.max(...arr));
}

function simplify(graph: number[][]) {
  // TODO: validate graph so that it doesn't produce an infinite loop
  // - check for NaN !!important
  // - check if matrix is a square (length = width) !!important
  // - check for negative numbers

  let amount = Array<number>(graph.length).fill(0);

  for (let p = 0; p < amount.length; p++) {
    for (let i = 0; i < amount.length; i++) {
      amount[p] += graph[i][p] - graph[p][i];
    }
  }

  let result = [];

  // Finish the while loop when every number in amount is 0
  // (i.e. when all debts are settled)
  while (amount.some((num) => Number(num.toFixed(2)) !== 0)) {
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
