const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/show-me-the-code/real/C/input.txt")
  .toString()
  .split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const numCount = Number(input[0]);
const aArray = input[1].split(" ").map(Number);
const bArray = input[2].split(" ").map(Number);

let result = 0;

for (let i = 0; i < numCount; i++) {
  let sum = 0;
  for (let j = 0; j + i < numCount; j++) {
    sum += aArray[i + j];
    sum -= bArray[i + j];
    if (sum === 0) {
      result++;
    }
  }
}

console.log(result);
