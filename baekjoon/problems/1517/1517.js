/* Bubble Sort */
// const fs = require("fs");
// const input = fs
//   .readFileSync("./baekjoon/problems/1517/input.txt")
//   .toString()
//   .split("\n");
// // const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// const length = Number(input[0]);
// const arr = input[1].split(" ").map(Number);

// let count = 0;

// for (let i = 0; i < length; i++) {
//   for (let j = 0; j < length - i; j++) {
//     if (j + 1 < length && arr[j] > arr[j + 1]) {
//       arr[j] = arr[j] + arr[j + 1];
//       arr[j + 1] = arr[j] - arr[j + 1];
//       arr[j] = arr[j] - arr[j + 1];
//       count++;
//     }
//   }
// }

// console.log(count);

/* Quick Sort */
// const fs = require("fs");
// const input = fs
//   .readFileSync("./baekjoon/problems/1517/input.txt")
//   .toString()
//   .split("\n");
// // const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// const length = Number(input[0]);
// const arr = input[1].split(" ").map(Number);
// const temp = Array.from({ length: length });
// let count = 0;

// quickSort(arr, 0, length - 1);

// console.log(count);

// function quickSort(arr, start, end) {
//   // 부분집합의 원소 갯수가 1개 이하면 더 이상 나누지 않음
//   if (start >= end) {
//     return;
//   }

//   // 가운데 인덱스 값을 구함
//   let middle = Math.floor((start + end) / 2);
//   let pivot = arr[middle];
//   let i = start;
//   let j = end;

//   while (i <= j) {
//     // pivot 왼쪽 원소의 값이 pivot보다 작은지 체크
//     while (arr[i] < pivot) {
//       i++;
//     }

//     // pivot 오른쪽 원소의 값이 pivot보다 큰지 체크
//     while (arr[j] > pivot) {
//       j--;
//     }

//     //
//     if (i <= j) {
//       // 두 원소의 값을 swap
//       let temp = arr[i];
//       arr[i] = arr[j];
//       arr[j] = temp;

//       if (i !== j) {
//         count += j - i + 1;
//       }

//       i++;
//       j--;
//     }
//   }

//   // pivot 기준 왼쪽 원소들로 다시 퀵 정렬 실행
//   if (start < j) {
//     quickSort(arr, start, j);
//   }
//   // pivot 기준 오른쪽 원소들로 다시 퀵 정렬 실행
//   if (end > i) {
//     quickSort(arr, i, end);
//   }
// }

/* Merge Sort */
const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/problems/1517/input.txt")
  .toString()
  .split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const length = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const temp = Array.from({ length: length });

let count = 0;

mergeSort(arr, 0, length - 1);

console.log(count);

// 배열의 start부터 end까지 정렬하는 함수
function mergeSort(arr, start, end) {
  // 부분집합의 원소 갯수가 1개 이하면 더 이상 나누지 않음
  if (start >= end) {
    return;
  }

  // 가운데 인덱스 값을 구함
  let middle = Math.floor((start + end) / 2);

  // 가운데를 기준으로 부분집합 2개로 분할
  mergeSort(arr, start, middle);
  mergeSort(arr, middle + 1, end);

  // 나누어서 정렬된 두 부분집합을 정렬하면서 합침
  merge(arr, start, middle, end);
}

// 가운데를 기준으로 나뉜 두 부분집합을 정렬하면서 합치는 함수
function merge(arr, start, middle, end) {
  let i = start;
  let j = middle + 1;
  let k = start;

  // 왼쪽 혹은 오른쪽 부분집합이 남아있으면 계속 반복
  while (i <= middle || j <= end) {
    // 왼쪽 부분집합에서 가져오는 경우
    if (j > end || (i <= middle && arr[i] <= arr[j])) {
      temp[k++] = arr[i++];
    }
    // 오른쪽 부분집합에서 가져오는 경우
    else {
      temp[k++] = arr[j++];
      // 왼쪽 부분집합에 남아있는 원소 갯수만큼 count
      count += middle - i + 1;
    }
  }

  // 원래 배열에 정렬된 값을 저장
  for (let l = start; l <= end; l++) {
    arr[l] = temp[l];
  }
}
