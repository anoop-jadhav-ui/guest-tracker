console.clear();


function canSum(targetSum, numbers, memo = {}) {
    if(memo[targetSum] !== undefined) return memo[targetSum];
    if (targetSum === 0) return true;
    if (targetSum < 0) return false;

    for (let num of numbers) {
        let remainder = targetSum - num;
        let remainderResult = canSum(remainder, numbers, memo)
        if (remainderResult === true) {
            memo[targetSum] = true;
            return true
        }
    }
    memo[targetSum] = false
    return false;
}

function howSum(targetSum, numbers, memo = {}){
    if(memo[targetSum] !== undefined) return memo[targetSum];
    if(targetSum === 0) return [];
    if(targetSum < 0) return null;

    for(let num of numbers){
        let remainder = targetSum - num;
        let remainderResult = howSum(remainder,numbers, memo);
        if(remainderResult !== null){
            let concatinatedResult = [num, ...remainderResult];
            memo[targetSum] = concatinatedResult;
            return concatinatedResult;
        }
    }

    memo[targetSum] = null;
    return null;
}

function bestSum(targetSum, numbers, memo = {}){
    if(memo[targetSum] !== undefined) return memo[targetSum];
    if(targetSum === 0) return [];
    if(targetSum < 0) return null;

    let bestResult = null;

    for(let num of numbers){
        let remainder = targetSum - num;
        let remainderResult = bestSum(remainder, numbers, memo);
        if(remainderResult !== null){
            let concatinatedResult = [num, ...remainderResult];
            if(bestResult === null || concatinatedResult.length < bestResult.length){
                bestResult = concatinatedResult;
            }
        }
    }

    memo[targetSum] = bestResult;
    return bestResult;
}

// console.log(canSum(7, [2, 3]));
// console.log(canSum(7, [5, 3, 4, 7]));
// console.log(canSum(7, [2, 4]));
// console.log(canSum(8, [2, 3, 5]));
// console.log(canSum(300, [7, 14]));

// console.log(howSum(7, [2, 3]));
// console.log(howSum(7, [5, 3, 4, 7]));
// console.log(howSum(300, [7, 14]));

console.log(bestSum(8, [2, 3, 5]));
console.log(bestSum(7, [5, 3, 4, 7]));
console.log(bestSum(100, [12]));


