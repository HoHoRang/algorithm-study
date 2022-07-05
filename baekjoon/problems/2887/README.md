# 백준 2887번 문제

## 문제

<img width="1025" alt="image" src="https://user-images.githubusercontent.com/15374108/177330404-d83e8817-583b-468e-bdf8-8517262b94c8.png">

<br>

## 해결과정

행성의 갯수와 각 행성의 (X,Y,Z) 좌표가 주어지고, 모든 행성을 연결하는 최소 비용을 구하는 문제이다.

문제를 처음 보고나서는 이중 반복문을 이용해 각 행성 간의 거리를 구해 별도로 저장한 다음, 정렬하여 모든 행성이 이어지는 비용을 구하려고 했다.

```Javascript
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
```

위와 같이 저장하고 정렬하면 아래와 같이 배열이 나온다.

```Javascript
// INPUT
5
11 -15 -15
14 -5 -15
-1 -1 -5
10 -4 -1
19 -4 19

// OUTPUT
[
  { point1: 0, point2: 1, distance: 0 },
  { point1: 3, point2: 4, distance: 0 },
  { point1: 0, point2: 3, distance: 1 },
  { point1: 1, point2: 3, distance: 1 },
  { point1: 1, point2: 4, distance: 1 },
  { point1: 2, point2: 3, distance: 3 },
  { point1: 2, point2: 4, distance: 3 },
  { point1: 1, point2: 2, distance: 4 },
  { point1: 0, point2: 4, distance: 8 },
  { point1: 0, point2: 2, distance: 10 }
]
```

<br>

## 풀이

ㅇㅇ
