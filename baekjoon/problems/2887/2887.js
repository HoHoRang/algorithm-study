/* 이중 반복문 이용해 각 행성 거리 구하는 로직 */
const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/problems/2887/input.txt")
  .toString()
  .split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// 입력받은 행성갯수 및 좌표 저장
const length = Number(input[0]);
const arr = [];

for (let i = 0; i < length; i++) {
  arr[i] = input[i + 1].split(" ");
}

// 각 행성 간의 거리 저장
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

// 각 행성 간의 거리 정렬
distanceArr.sort((a, b) => {
  return a.distance - b.distance;
});

const parentArr = Array.from(Array(length), (_, i) => i);

let count = 0;
let minSum = 0;

for (let i = 0; i < distanceArr.length; i++) {
  // 각 비용들이 오름차순으로 정렬된 배열에서 낮은 비용부터 선택
  // 사이클을 형성하는 것은 제외
  union(distanceArr[i].point1, distanceArr[i].point2, distanceArr[i].distance);

  // (4) N-1개를 만족하면 종료
  if (count === length - 1) {
    break;
  }
}

console.log(minSum);

function find(x) {
  if (parentArr[x] == x) {
    return x;
  } else {
    return find(parentArr[x]);
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

function calculateDistance(arr1, arr2) {
  return Math.min(
    Math.abs(arr1[0] - arr2[0]),
    Math.abs(arr1[1] - arr2[1]),
    Math.abs(arr1[2] - arr2[2])
  );
}
