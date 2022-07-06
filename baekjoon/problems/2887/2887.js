/* 이중 반복문 이용해 각 행성 거리 구하는 로직 */
// const fs = require("fs");
// const input = fs
//   .readFileSync("./baekjoon/problems/2887/input.txt")
//   .toString()
//   .split("\n");
// // const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// // 입력받은 행성갯수 및 좌표 저장
// const length = Number(input[0]);
// const arr = [];

// for (let i = 0; i < length; i++) {
//   arr[i] = input[i + 1].split(" ");
// }

// // 각 행성 간의 거리 저장
// const distanceArr = [];

// for (let i = 0; i < length - 1; i++) {
//   for (let j = i + 1; j < length; j++) {
//     const temp = [i, j, calculateDistance(arr[i], arr[j])];
//     distanceArr.push(temp);
//   }
// }

// // 각 행성 간의 거리 정렬
// distanceArr.sort((a, b) => a[2] - b[2]);

// const parentArr = Array.from(Array(length), (_, i) => i);

// let count = 0;
// let minSum = 0;

// for (let i = 0; i < distanceArr.length; i++) {
//   // 각 비용들이 오름차순으로 정렬된 배열에서 낮은 비용부터 선택
//   // 사이클을 형성하는 것은 제외
//   union(distanceArr[i][0], distanceArr[i][1], distanceArr[i][2]);

//   // N-1개를 만족하면 종료
//   if (count === length - 1) {
//     break;
//   }
// }

// console.log(minSum);

// function find(x) {
//   if (parentArr[x] == x) {
//     return x;
//   } else {
//     return (parentArr[x] = find(parentArr[x]));
//   }
// }

// function union(x, y, d) {
//   x = find(x);
//   y = find(y);

//   // 연결되는 경우(root가 다르다는 건 연결되어 있지 않다는 의미)
//   if (y !== x) {
//     count++;
//     minSum += d;
//   }

//   parentArr[y] = x;
// }

// function calculateDistance(arr1, arr2) {
//   return Math.min(
//     Math.abs(arr1[0] - arr2[0]),
//     Math.abs(arr1[1] - arr2[1]),
//     Math.abs(arr1[2] - arr2[2])
//   );
// }

/* 각 좌표축에 대해서만 거리 저장 */
const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/problems/2887/input.txt")
  .toString()
  .split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// 입력받은 행성갯수 및 좌표 저장
const length = Number(input[0]);

const xArr = [];
const yArr = [];
const zArr = [];

for (let i = 0; i < length; i++) {
  xArr[i] = [Number(input[i + 1].split(" ")[0]), i];
  yArr[i] = [Number(input[i + 1].split(" ")[1]), i];
  zArr[i] = [Number(input[i + 1].split(" ")[2]), i];
}

// [좌표, 행성]
xArr.sort((a, b) => a[0] - b[0]);
yArr.sort((a, b) => a[0] - b[0]);
zArr.sort((a, b) => a[0] - b[0]);

const distanceArr = [];

for (let i = 1; i < length; i++) {
  // [행성1, 행성2, 비용]
  distanceArr.push([xArr[i][1], xArr[i - 1][1], xArr[i][0] - xArr[i - 1][0]]);
  distanceArr.push([yArr[i][1], yArr[i - 1][1], yArr[i][0] - yArr[i - 1][0]]);
  distanceArr.push([zArr[i][1], zArr[i - 1][1], zArr[i][0] - zArr[i - 1][0]]);
}

distanceArr.sort((a, b) => a[2] - b[2]);

const parentArr = Array.from(Array(length), (_, i) => i);

let count = 0;
let minSum = 0;

for (let i = 0; i < distanceArr.length; i++) {
  // 각 비용들이 오름차순으로 정렬된 배열에서 낮은 비용부터 선택
  // 사이클을 형성하는 것은 제외
  union(distanceArr[i][0], distanceArr[i][1], distanceArr[i][2]);

  // N-1개를 만족하면 종료
  if (count === length - 1) {
    break;
  }
}

console.log(minSum);

function find(x) {
  if (parentArr[x] === x) {
    return x;
  } else {
    return (parentArr[x] = find(parentArr[x]));
  }
}

function union(x, y, d) {
  x = find(x);
  y = find(y);

  // 연결되는 경우(root가 다르다는 건 연결되어 있지 않다는 의미)
  if (y !== x) {
    count++;
    minSum += d;
  }

  parentArr[y] = x;
}
