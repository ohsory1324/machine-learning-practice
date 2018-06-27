# 퍼셉트론 (Perceptron)

인간의 뉴런을 본따 만든 알고리즘.

입력 데이터: [[x<sub>00</sub>, x<sub>01</sub>, ..., x<sub>0i</sub>], ..., [x<sub>j0</sub>, x<sub>j1</sub>, ..., x<sub>ji</sub>]]

출력 데이터 (0 또는 1): [y<sub>0</sub>, y<sub>1</sub>, ..., y<sub>j</sub>]

***입출력 데이터의 길이는 j로 같아야함***

---
y<sub>n</sub> = Φ(w<sub>0</sub>x<sub>n0</sub> + w<sub>1</sub>x<sub>n1</sub> + ... + w<sub>i</sub>x<sub>ni</sub> + b)
= Φ(Σwx + b)

위의 식을 만족하는 w(길이가 j인 배열, weight), b(bias)를 구한다.
여기서 Φ는 활성화 함수(Activation Function)으로 step function, sigmoid function 등이 있다.

퍼셉트론은 가중치 w와 b를 조정하는 방식으로 환원 접근법을 이용한다. 이는 초기 가중치를 임의의 값으로 정하고 예측값과 실제값이 일치할 때 까지 가중치의 값을 계속 바꾸는 방식이다.

w = w + n(y<sub>i</sub> - y<sub>hi</sub>)x

b = b + n(y<sub>i</sub> - y<sub>hi</sub>)