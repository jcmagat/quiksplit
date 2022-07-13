function getMin(arr) {
  var minInd = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[minInd]) minInd = i;
  }

  return minInd;
}

function getMax(arr) {
  var maxInd = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxInd]) maxInd = i;
  }

  return maxInd;
}

// A utility function to return minimum of 2 values
function minOf2(x, y) {
  return x < y ? x : y;
}

// Given a set of persons as graph
// where graph[i][j] indicates
// the amount that person i needs to
// pay person j, this function
// finds and prints the minimum
// cash flow to settle all debts.
function simplify(graph) {
  if (graph.length < 2) return graph;

  // Create an array amount,
  // initialize all value in it as 0.
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

  // amount[p] indicates the net amount
  // to be credited/debited to/from person 'p'
  // If amount[p] is positive, then
  // i'th person will amount[i]
  // If amount[p] is negative, then
  // i'th person will give -amount[i]
  function simplifyRecursive(amount) {
    // Find the indexes of minimum and
    // maximum values in amount
    // amount[mxCredit] indicates the maximum amount
    // to be given (or credited) to any person .
    // And amount[mxDebit] indicates the maximum amount
    // to be taken(or debited) from any person.
    // So if there is a positive value in amount,
    // then there must be a negative value
    let mxCredit = getMax(amount);

    let mxDebit = getMin(amount);

    // If both amounts are 0, then
    // all amounts are settled
    if (amount[mxCredit] <= 0 && amount[mxDebit] <= 0) return;

    // Find the minimum of two amounts
    let min = minOf2(-amount[mxDebit], amount[mxCredit]);

    amount[mxCredit] -= min;
    amount[mxDebit] += min;

    console.log(amount);

    // If minimum is the maximum amount to be
    console.log(`${mxDebit} pays ${mxCredit}: $${min}`);
    result.push({
      debtorId: mxDebit,
      creditorId: mxCredit,
      amount: min,
    });

    // Recur for the amount array.
    // Note that it is guaranteed that
    // the recursion would terminate
    // as either amount[mxCredit]  or
    // amount[mxDebit] becomes 0
    simplifyRecursive(amount);
  }

  simplifyRecursive(amount);

  return result;
}

export default simplify;
