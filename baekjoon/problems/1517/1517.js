/* Bubble Sort */
const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/problems/1517/input.txt")
  .toString()
  .split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const length = Number(input[0]);
const arr = input[1].split(" ").map(Number);

let count = 0;

for (let i = 0; i < length; i++) {
  for (let j = 0; j < length - i; j++) {
    if (j + 1 < length && arr[j] > arr[j + 1]) {
      arr[j] = arr[j] + arr[j + 1];
      arr[j + 1] = arr[j] - arr[j + 1];
      arr[j] = arr[j] - arr[j + 1];
      count++;
    }
  }
}

console.log(count);
