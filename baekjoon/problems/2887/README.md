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
// 각 행성 간의 거리 저장
const distanceArr = [];

for (let i = 0; i < length - 1; i++) {
  for (let j = i + 1; j < length; j++) {
    const temp = [i, j, calculateDistance(arr[i], arr[j])];
    distanceArr.push(temp);
  }
}

// 각 행성 간의 거리 정렬
distanceArr.sort((a, b) => a[2] - b[2]);
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

// OUTPUT([행성1, 행성2, 비용])
[
  [ 0, 1, 0 ],
  [ 0, 2, 10 ],
  [ 0, 3, 1 ],
  [ 0, 4, 8 ],
  [ 1, 2, 4 ],
  [ 1, 3, 1 ],
  [ 1, 4, 1 ],
  [ 2, 3, 3 ],
  [ 2, 4, 3 ],
  [ 3, 4, 0 ]
]
```

그리고 위의 배열을 반복(비용이 적은 것부터)하면서, 기존에 연결되어 있는 경우가 아닐 때 비용에 합하기로 했다.

찾아보니 위와 같은 로직은 '최소 스패닝 트리'로 모든 점(행성)을 연결하는 최소 연결 그래프이면서, 연결된 선(간선)들의 비용(가중치)의 합이 최소인 트리이고, 이 트리를 구하는 Kruskal 알고리즘이라고 한다.

그리고 기존에 연결되어 있는 행성인지 확인하기 위해, 'Union-Find'라는 알고리즘을 이용하여 풀기로 했다.

```Javascript
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

해답을 얻기가 어려워, 질문 검색을 통해 모든 경로를 계산하는 경우 메모리 초과가 발생한다는 것을 알게 되었다.  
추가로, 문제에서 비용을 계산하는 방식은 X,Y,Z 축 중에서 거리가 가장 작은 것을 산정하는 방식이므로, 각 축에 대해 좌표를 정렬하고 인접한 행성들의 거리들로만 계산하면 된다는 힌트를 얻었다.

```Javascript
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
```

그래서 각 축의 좌표들과 행성 인덱스로만 구성된 배열을 각각 만들어 정렬해주었다.

```Javascript
const distanceArr = [];

for (let i = 1; i < length; i++) {
  // [행성1, 행성2, 비용]
  distanceArr.push([xArr[i][1], xArr[i - 1][1], xArr[i][0] - xArr[i - 1][0]]);
  distanceArr.push([yArr[i][1], yArr[i - 1][1], yArr[i][0] - yArr[i - 1][0]]);
  distanceArr.push([zArr[i][1], zArr[i - 1][1], zArr[i][0] - zArr[i - 1][0]]);
}

distanceArr.sort((a, b) => a[2] - b[2]);
```

그리고 메모리 초과가 발생한 방식에서와 같이, 행성 간의 비용을 저장하는 배열을 만들어 데이터를 넣고 비용 순서대로 정렬하였다.

```Javascript
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
    return find(parentArr[x]);
  }
}
```

그리고 기존 로직처럼 비용이 적은 터널부터 중복으로 연결을 발생시키지 않는지 확인하여 연결해주었다.

<img width="1038" alt="image" src="https://user-images.githubusercontent.com/15374108/177621571-40674ee7-bfb6-4221-b8b7-f8bffee94e36.png">

하지만 이번에는 메모리 초과가 발생하진 않았지만, 시간 초과가 발생했다. 코드를 수정하면서 제출하다보니 union-find를 실행하면서 재귀함수가 호출되는 시간이 초과된 것으로 확인했다.

이 부분은 도저히 어떻게 재귀함수의 호출 시간을 줄일 수 있는지 생각이 나지 않았다. 그래서 계속 고민 후 질문을 검색하여 아래와 같이 코드를 수정함으로 시간 안에 실행이 됨을 확인하였다.

```Javascript
function find(x) {
  if (parentArr[x] === x) {
    return x;
  } else {
    return (parentArr[x] = find(parentArr[x]));
  }
}
```

부모를 찾으면서 부모에 다시 할당해준다? 처음에는 이해가 되지 않았지만, 기존 코드와의 차이를 찾다보니 이것은 root를 찾아가면서 자신의 부모를 root로 설정해주는 로직이었다.

기존 로직은 (실제로 그렇지는 않지만) 서로 연결되어 있다는 것을 배열을 통해 행성의 부모정보를 저장해 가지고 있었다. 그렇기 때문에 체인처럼 쭉 이어지는 구조가 될 수 있는데, 일자로 쭉 이어지는 경우에는 같은 집합이 속하는지 확인하기 위해 root를 찾아가는 과정에서 재귀함수가 여러 번 호출되어 시간이 오래 걸리는 것이었다. 어차피 같은 root를 가진다는 정보만 있으면 서로 이어진 행성인지 식별이 가능하므로, root를 찾아가는 과정에서 부모를 root로 설정해주는 것이다.

위와 같이 코드를 수정하고 제출하니 아래와 같이 통과한 것을 확인할 수 있다.

<img width="1036" alt="image" src="https://user-images.githubusercontent.com/15374108/177623074-38fb530f-df10-4c33-9650-5ea9c5583c86.png">
