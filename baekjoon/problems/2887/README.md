# 백준 2887번 문제

## 문제

[2887번 문제 링크](https://www.acmicpc.net/problem/2887)

<img width="1025" alt="image" src="https://user-images.githubusercontent.com/15374108/177330404-d83e8817-583b-468e-bdf8-8517262b94c8.png">

[그래프 이론](https://www.ibs.re.kr/cop/bbs/BBSMSTR_000000000901/selectBoardArticle.do?nttId=17000&pageIndex=3&searchCnd=&searchWrd=)  
[그래프 이론2](http://www.kwangsiklee.com/2017/11/%EA%B7%B8%EB%9E%98%ED%94%84-%EC%9D%B4%EB%A1%A0-%EA%B8%B0%EC%B4%88-%EC%A0%95%EB%A6%AC/)  
정렬  
[최소 스패닝 트리(MST)](https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html)  
[최소 스패닝 트리(MST)2](https://4legs-study.tistory.com/111)

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

위와 같이 저장하고 정렬하면 아래와 같이 각 행성 간의 최소거리를 저장한 배열이 나온다.

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

그리고 위의 배열을 반복(비용이 적은 것부터)하면서, 기존에 연결되어 있는 경우가 아닐 때 비용에 합하기로 했다.

찾아보니 위와 같은 로직은 '최소 스패닝 트리'로 모든 점(행성)을 연결하는 최소 연결 그래프이면서, 연결된 선(간선)들의 비용(가중치)의 합이 최소인 트리를 말한다고 한다.

그리고 기존에 연결되어 있는 행성인지 확인하기 위해, 'Union-Find'라는 알고리즘을 이용하여 풀기로 했다.

```Javascript
for (let i = 0; i < distanceArr.length; i++) {
  // 각 비용들이 오름차순으로 정렬된 배열에서 낮은 비용부터 선택
  // 사이클을 형성하는 것은 제외
  union(distanceArr[i].point1, distanceArr[i].point2, distanceArr[i].distance);

  // N-1개를 만족하면 종료
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
```

위와 같이 find 함수에서 재귀함수로 해당 행성이 연결된 root 행성을 찾고, union 함수에서 root 행성끼리 연결시켜주는 것이다.

다만, 연결하려는 행성의 root가 같다는 건 이미 연결되어 있다는 의미이므로, root가 다를 경우에만 비용을 계산했다.

```Javascript
// 각 인덱스 0,1,2,3,4에 해당하는 부모 행성정보
[ 0, 0, 2, 3, 4 ]
[ 0, 0, 2, 3, 3 ]
[ 0, 0, 2, 0, 3 ]
[ 0, 0, 2, 0, 3 ]
[ 0, 0, 2, 0, 3 ]
[ 2, 0, 2, 0, 3 ]
4
```

결과를 찍어보면 위와 같이 반복문을 통해 각 행성(인덱스)가 바라보는 부모 행성이 저장되는 것을 볼 수 있다.

행성을 연결하는 갯수가 N-1을 만족하므로 반복문이 종료되고 결과 4를 출력하는 것을 확인할 수 있다.

<img width="856" alt="image" src="https://user-images.githubusercontent.com/15374108/177397174-79ba4cf7-48cb-46d6-94c9-95b5947c74a8.png">

하지만, 위와 같이 풀면 메모리 초과가 발생한다.

<br>

## 풀이

ㅇㅇ
