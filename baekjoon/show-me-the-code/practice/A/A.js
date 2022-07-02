//여러 줄 입력

let fs = require("fs");
let input = fs
  .readFileSync("./baekjoon/show-me-the-code/practice/A/input.txt")
  .toString()
  .split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

console.log(input);
