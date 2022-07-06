# 백준 1517번 문제

## 문제

[1517번 문제 링크](https://www.acmicpc.net/problem/1517)

<img width="1252" alt="image" src="https://user-images.githubusercontent.com/15374108/177386363-f89cb295-18a0-4667-b439-a3f14c8e00d0.png">

자료구조  
정렬  
[세그먼트 트리](https://blog.naver.com/ndb796/221282210534)  
[세그먼트 트리2](https://velog.io/@kimdukbae/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%84%B8%EA%B7%B8%EB%A8%BC%ED%8A%B8-%ED%8A%B8%EB%A6%AC-Segment-Tree)  
[분할 정복](https://loosie.tistory.com/237)

<br>

## 해결과정

문제 이름이 버블 소트여서, 버블 소트를 구현하고 배열의 요소 간 swap이 일어날 경우 count를 해주면 될 것으로 생각했다.

```Javascript
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
```

정말 단순히 이중 반복문을 이용하여 if문에서 swap이 발생할 경우 count++를 해서 결과를 출력했다.

<img width="874" alt="image" src="https://user-images.githubusercontent.com/15374108/177399369-cba778a9-784d-44f3-a75f-285070808b59.png">

하지만, 위와 같이 시간 초과가 발생했다. Javascript가 느린건가 싶어 Java로도 구현해봤지만 동일하게 시간 초과였다.  
백준에서 그렇게 간단하게 버블소트만을 구현하는 문제를 낸 건 아닌 것 같다.

<br>

버블소트의 swap 횟수를 구하는데 버블소트를 사용하지 못한다니, 솔직히 문제의 출제 의도를 파악하지 못했다.  
그래서 문제의 질문 게시판과 알고리즘 분류를 참고해보니, 당연하게도 버블소트가 아니라, 세그먼트 트리 혹은 분할 정복 알고리즘을 통해 빠르게 답을 구할 수 있다고 했다.

세그먼트 트리는 개념을 제대로 이해하고 있지 못해, 분할 정복 알고리즘을 사용하는 Merge Sort(병합 정렬)와 Quick Sort(퀵 정렬)을 이용해 문제를 풀어보았다.

<br>

## 풀이

그런데, 분할 정복 알고리즘을 이용하면 어떻게 버블소트의 swap 횟수를 구할 수 있을까 생각해 보았다.

버블소트는 인접한 두 요소의 크기를 비교하여 (오름차순인 경우)앞의 요소가 더 크면 뒤의 요소와 swap이 일어난다. 즉, 큰 값이 제자리를 찾아가면서 만나는 값들의 갯수가 결국 swap 횟수인 셈이다.

분할 정복 알고리즘에서도, 분할을 한 다음 합치는 과정에서 값을 비교해 swap을 한다. 합칠 때 오른쪽 집합의 값이 더 작아 먼저 정렬될 경우, 왼쪽 집합에 남은 값의 갯수만큼 count를 해주면 버블소트의 swap이 일어나는 횟수가 동일한 값을 얻을 수 있을 것이다.

### Quick Sort(퀵 정렬)(해결X)

```Javascript
function quickSort(arr, start, end) {
  // 부분집합의 원소 갯수가 1개 이하면 더 이상 나누지 않음
  if (start >= end) {
    return;
  }

  // 가운데 인덱스 값을 구함
  let middle = Math.floor((start + end) / 2);
  let pivot = arr[middle];
  let i = start;
  let j = end;

  while (i <= j) {
    // pivot 왼쪽 원소의 값이 pivot보다 작은지 체크
    while (arr[i] < pivot) {
      i++;
    }

    // pivot 오른쪽 원소의 값이 pivot보다 큰지 체크
    while (arr[j] > pivot) {
      j--;
    }

    //
    if (i <= j) {
      // 두 원소의 값을 swap
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      i++;
      j--;
    }
  }

  // pivot 기준 왼쪽 원소들로 다시 퀵 정렬 실행
  if (start < j) {
    quickSort(arr, start, j);
  }
  // pivot 기준 오른쪽 원소들로 다시 퀵 정렬 실행
  if (end > i) {
    quickSort(arr, i, end);
  }
}
```

퀵 정렬은 가운데 값을 Pivot으로 잡고, 그보다 작은 값은 왼쪽에, 그보다 큰 값은 오른쪽에 위치하도록 반복문을 돌면서 swap을 해줬다.  
하지만, 병합정렬처럼 비교하는 원소들이 차례로 swap되는 것이 아니라, pivot을 기준으로 작은 값과 큰 값의 위치를 바꿔버리기 때문에, 인접한 원소들과 몇 회 swap되었는지 확인하기가 어려웠다. 그리고 위치를 바꾸는 과정에서

```Javascript
1 4 '3' 5 2 6

1 2 '3' 5 4 6 // pivot 3을 기준으로 4와 2가 바뀜
```

위와 같이 4가 5보다 작음에도 뒤에 들어가고, 이후의 재귀호출을 통해 다시 정렬이 되어 규칙을 찾는데 어려움이 있었다.

### Merge Sort(병합 정렬)(해결O)

```Javascript
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
```

배열을 가운데로 나누어 더 이상 나누어지지 않을 때까지 나누고 정렬하면서 합치는 함수이다.

```Javascript
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
```

부분집합을 합치는 함수 부분으로, 오른쪽 부분집합에서 원소를 가져오는 경우, 왼쪽 부분집합에 원소가 남아있으면, 그 갯수만큼 swap이 되는 것이므로 그만큼 count를 해주는 로직이다.

주의할 점은, 원소의 값이 같은 경우 swap이 count되면 안된다는 것이다. 그래서, 값이 같은 경우는 왼쪽 부분집합에서 가져오도록 구현했다.

![image](https://user-images.githubusercontent.com/15374108/177584833-57770bd1-a0f2-4a0d-a6f3-a7da6fde38bb.png)

위와 같이 Merge Sort를 이용하면 시간이 초과하지 않고 통과하는 것을 확인했다.
