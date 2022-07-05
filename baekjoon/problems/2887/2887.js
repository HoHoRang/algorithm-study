/* 이중 반복문 이용해 각 행성 거리 구하는 로직 */
const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/problems/2887/input.txt")
  .toString()
  .split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

let result = 0;

const length = Number(input[0]);

const arr = [];

for (let i = 0; i < length; i++) {
  arr[i] = input[i + 1].split(" ").map(Number);
}

const distanceArr = [];

for (let i = 0; i < length - 1; i++) {
  for (let j = i + 1; j < length; j++) {
    const temp = {
      point1: i,
      point2: j,
      distance: calculateDistance(arr[i], arr[j]),
    };

    distanceArr.push(temp);
  }
}

distanceArr.sort((a, b) => {
  return a.distance - b.distance;
});

// console.log(distanceArr);

for (let i = 0; i < distanceArr.length; i++) {}

function calculateDistance(arr1, arr2) {
  return Math.min(
    Math.abs(arr1[0] - arr2[0]),
    Math.abs(arr1[1] - arr2[1]),
    Math.abs(arr1[2] - arr2[2])
  );
}

// const fs = require("fs");
// const input = fs
//   .readFileSync("./baekjoon/problems/2887/input.txt")
//   .toString()
//   .split("\n");
// // const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// let result = 0;

// const length = Number(input[0]);

// const arr = [];

// for (let i = 0; i < length; i++) {
//   arr[i] = input[i + 1].split(" ").map(Number);
// }
