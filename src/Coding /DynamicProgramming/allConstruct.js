function allConstruct(targetString, strings, memo = {}) {

    if(memo[targetString] !== undefined) return memo[targetString];
    if (targetString === '') return [[]];


    let mergedArr = [];
    for (let str of strings) {
        if (targetString.indexOf(str) === 0) {
            let targetStrCopy = targetString;
            let remainderStr = targetStrCopy.replace(str, '');

            let resultArr = allConstruct(remainderStr, strings, memo);
            let targetArr = resultArr.map(way => [str,...way])
            mergedArr.push(...targetArr);
           
        }
    }


memo[targetString] = mergedArr;
  return mergedArr;
}


// console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]));
console.log(allConstruct("pokemon", ["po", "mo", "ke", "n","p","o"]));
console.log(allConstruct("eeeeeee",["e","ee","eee","eeee"]));