// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// function solution(X, Y, D) {
//     // write your code in JavaScript (Node.js 8.9.4)
//     return jump(X,Y,D)
// }

function jump(currentPos, destination, jumpDistance){
    
    return Math.ceil((destination - currentPos)/jumpDistance)
    
}

console.log(jump(3, 999111321, 7))
console.log(jump(1, 5, 2))