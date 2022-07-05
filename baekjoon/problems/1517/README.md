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

## 풀이

ㅇㅇ
