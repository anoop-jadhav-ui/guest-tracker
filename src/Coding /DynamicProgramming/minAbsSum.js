function getValuesPossible(firstValue, secondValue) {
    let sumArr = [];
    console.log((firstValue * 1) + (secondValue * 1));

    sumArr.push(Math.abs((firstValue * 1) + (secondValue * 1)));
    sumArr.push(Math.abs((firstValue * 1) + (secondValue * -1)));
    sumArr.push(Math.abs((firstValue * -1) + (secondValue * 1)));
    sumArr.push(Math.abs((firstValue * -1) + (secondValue * -1)));


    sumArr = sumArr.sort((a, b) => {
        if (a > b) return 1;
        else return -1
    })

    return sumArr;
}

// function minAbsSum(values, memo = {}) {
//     if(memo[values.join()] !== undefined) return memo[values.join()];
//     if (values.length === 0) return 0
//     if (values.length === 1) return values[0]

//     let minSum;

//     for (let value of values) {

//         let tempValues = [...values]
//         let popedValueIndex = 0;

//         let firstValue;
//         tempValues.forEach((ele,index) => {
//             if(ele === value){
//                 popedValueIndex = index;
//                 firstValue = ele;
//             }
//         })

//         tempValues.splice(popedValueIndex,1);

//         let remainder = minAbsSum(tempValues);
//         let currMinSum = getLowestValue(firstValue, remainder);

//         if(minSum === undefined || currMinSum <= minSum){
//             minSum = currMinSum
//         }
//     }

//     return minSum;
// }


function minAbsSum(values, memo = {}) {
    if (memo[values.join()] !== undefined) return memo[values.join()];
    if (values.length === 0) return 0
    if (values.length === 1) return values[0]

    let minSum = null;
    if (values.length > 1) {
        for (let i = 0; i < values.length; i++) {
            let tempValues = [...values];
            let firstValue = values[i];
            tempValues.splice(i, 1);



            let returnValue = minAbsSum(tempValues);

            console.log(firstValue, returnValue)
            let resultArr = getValuesPossible(firstValue, returnValue);


            // eslint-disable-next-line no-loop-func
            resultArr.forEach(ele => {
                let resultArr2 = getValuesPossible(ele, firstValue);
                console.log(resultArr2);
                resultArr2.forEach(ele => {
                    if (minSum === null || minSum > ele) {
                        minSum = ele;
                    }
                })
            })
        }
        return minSum;
    }
}

// console.log(minAbsSum(([3, 3, 3, 4, 5])));
// console.log(minAbsSum(([3, 3, 3, 4, 5])));
// console.log(minAbsSum(([1, 5, 2, -2])));
console.log(minAbsSum(([5, -5])));
// console.log(minAbsSum([2, 3, 2, 2, 3]))