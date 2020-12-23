function canConstruct(targetString, strings, memo = {}){
    if(memo[targetString] !== undefined) return memo[targetString];
    if(targetString === '') return true;
    
    for(let str of strings){
        if(targetString.indexOf(str) === 0){
            let targetStrCopy = targetString;
            let  remainderStr = targetStrCopy.replace(str,'');
            let results = canConstruct(remainderStr, strings, memo)
            if(results === true){
                memo[targetString] = true;
                return true;
            }
        }
    }
    memo[targetString]= false;
    return false;
}


console.log(canConstruct("abcdef",["ab","abc","cd","def","abcd"]));
console.log(canConstruct("pokemon",["po","mo","ke","n"]));
console.log(canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef",["e","ee","eee","eeee"]));