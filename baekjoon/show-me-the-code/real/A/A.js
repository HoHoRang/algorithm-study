// const fs = require("fs");
// const input = fs
//   .readFileSync("./baekjoon/show-me-the-code/real/A/input.txt")
//   .toString()
//   .split("\n");
// // const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// const [numMonster, initialHP] = input[0].split(" ").map(Number);
// const atkMonster = input[1].split(" ").map(Number);
// const people = input[2].split(" ").map(Number);

// let result = 0; // 구한 마을 사람 수
// let prevCost = 0; // 이전 마을에서 소모한 체력
// let charHP = initialHP;

// while (true) {
//   const min = Math.min(...atkMonster); // 가장 약한 몬스터 찾음
//   const idx = atkMonster.indexOf(min); // 해당 마을 찾음

//   // 체력이 다 떨어졌거나, 남은 체력이 남은 몬스터 공격력보다 적은 경우
//   if (charHP <= 0 || charHP < min) {
//     break;
//   }

//   prevCost += min; // 소모한 체력 저장
//   charHP -= prevCost; // 체력 소모
//   result += people[idx]; // 마을 사람 추가

//   atkMonster.splice(idx, 1); // 해당 마을 제외

//   // console.log("prevCost: ", prevCost);
//   // console.log("charHP: ", charHP);
//   // console.log("result: ", result);
//   // console.log("atkMonster: ", atkMonster);
// }

// console.log(result);

const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/show-me-the-code/real/A/input.txt")
  .toString()
  .split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const [numMonster, initialHP] = input[0].split(" ").map(Number);
const atkMonster = input[1].split(" ").map(Number);
const people = input[2].split(" ").map(Number);

let result = 0; // 구한 마을 사람 수
let prevCost = 0; // 이전 마을에서 소모한 체력
let charHP = initialHP;

while (true) {
  const max = Math.max(...people); // 가장 사람이 많은 마을 찾음
  const idx = people.indexOf(max); // 해당 마을 찾음
  const monster = atkMonster[idx]; // 해당 마을 몬스터 공격력
  const min = Math.min(...atkMonster); // 가장 약한 몬스터 찾음

  // 체력이 다 떨어졌거나, 남은 체력이 남은 몬스터 공격력보다 적은 경우
  if (charHP <= 0 || charHP < min) {
    break;
  }

  // 해당 마을의 몬스터 공격력보다 체력이 적으면 생략함
  if (charHP >= monster + prevCost) {
    prevCost += monster; // 소모한 체력 저장
    charHP -= prevCost; // 체력 소모
    result += people[idx]; // 마을 사람 추가
  }

  atkMonster.splice(idx, 1); // 해당 마을 제외
  people.splice(idx, 1);

  // console.log("prevCost: ", prevCost);
  // console.log("charHP: ", charHP);
  // console.log("result: ", result);
  // console.log("atkMonster: ", atkMonster);
}

console.log(result);
