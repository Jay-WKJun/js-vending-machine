<p align="middle" >
  <img src="https://nextstep-storage.s3.ap-northeast-2.amazonaws.com/536baaa17ed346bb851cc9f663edb069" width="400">
</p>
  <h1 align="middle">자바스크립트와 Cypress로 구현하는 자판기</h1>
  <p align="middle">
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
    <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
  </p>
</p>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br/>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br/>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-vending-machine/issues)에 등록해주세요.

<br/>

# 1차 설계 방식

> 최소한의 변경으로 refactoring이 가능하도록 구현하는 것이 목표.

서로 결합도가 낮아야 변경하기 쉬운 코드.

- render 방식 격리를 통한 clean architecture 구현

rendering 방식을 template string을 통한 innerHTML을 이용.

나머지 front 로직은 바꾸지 않아도 되도록 render 메소드 격리. (rendering 방식만 간단하게 바꿀 수 있도록)

- Controller 없이 구현

HTML을 직접 JS로 그려주는 로직이기 때문에, JS로 만든 DOM 객체에 직접 event를 달아줘야 함

따라서 Controller가 필요없음. (MVVM 형태를 고려)

## 어디까지 격리할 것인가?

> 몰라도 알아서 하게 끔, 구체적인 instance가 아닌 상위의 interface를 의존해야한다.

통상적으로 생각되는 Model과 Controller는 변경되지 않지만,,, rendering하는 방식만 바뀔 뿐.

Controller를 hook처럼 격리시키고 사용하면, 변경에도 유연할 것.

Model은 Proxy를 이용한 observer 패턴을 이용해, 변화가 있을 때마다, View에 전달할 수 있도록 하기. = 변화 없이도 가능

### Model 설계

그렇다고 event에서 모델에 직접 변화를 주면 결합도가 생기게 된다.

dispatch의 경우, action명과 payload를 주기만하면 되기 때문에, dispatch라는 interface는 확실하게 지켜진다.

메소드를 직접적으로 제공할 경우, interface가 바뀌기 때문에, 에러가 발생할 확률이 있다.

하지만, action을 바꾸거나 했을 경우엔, 에러는 나지 않지만, 생각했던 대로 작동하지 않기 때문에, 이것도 결국 바꿔줘야한다.

action이 바뀌어 제대로 작동하지 않을 때 컴파일 경고를 해주지 않기 때문에, 오히려 위험할 수도 있다.

**따라서, store 갱신을 위한 method를 직접 제공하는 편이 좋을 것 같다.**

대신 method에선 데이터만 받아들이고 store 갱신은 알아서 하는 것으로 결합성을 줄인다.

하지만, dispatch라는 함수에 subscribe 통보를 한번에 처리할 수 있기 때문에, 큰 장점이 있다.

## mount, unmount를 활용하자.

Element가 HTML DOM에 mount되고 없어질 때를 확실하게.

# 설계 생각 정리

미션이 step1과 step2의 View 형태가 다르다.

따라서 다른 부분을 건들지 않으면서 View만을 온전히 교체할 수 있는 아키텍쳐를 생각했다.

그리고 이번엔 observer가 아니라 직접 render하는 방법으로 해보자.

최적화에 대한 로직이 좀 어려우니 최대한 수동으로 해보자.

## 구체적으로?

ViewModel은 View를 몰라도 된다.

Binder는 View를 알아야한다.

Binder는 ViewModel을 받아 정제해 View의 render에 넘긴다.

이렇게 하면 Binder가 사용하는 View의 interface만 같다면 View를 마음대로 갈아끼울 수 있다.

하지만, Model의 변화를 통한 View가 어떻게 그려져야 하는지 ViewModel을 통해 남겨져 있기 때문에, 구체적인 View의 표현도 가능하다. 남은건 Binder와 View를 통한 실제 DOM 구현이다.

## 그래서 구현은?

### 1단계

어차피 Model과 ViewModel을 그리는 단계에서 UI가 어떻게 표현되어야하는지 모두 정해진다.

### 2단계

Binder는 범용성있게 작성. 하나로 계속해서 사용하도록 한다.

Binder가 View를 Control한다.

### View를 하나씩 작성

이제 Binder에 맞춰 interface를 작성하고

그 안을 채워나간다.

최대한 simple하게 채운다.

# 왜 VM은 DOM구조를 그대로 지켜야 하는가.

이름으로 element를 특정하기 시작하면, View에서 정한 이름들을 ViewModel이 알고 있어야한다.

정확히 알고 있을 필요는 없지만, 일치하지 않으면 제대로 적용되지를 않으니, View가 정한 각 Element들의 이름들을 알 필요가 있다.

따라서 ViewModel 또한, DOM 구조를 가질 필요가 있다.

하지만, DOM 구조를 그대로 지키면, 있는 위치대로 matching해서 적용시킬 수 있기 때문에 View에서 어떻게 이름을 정했는지는 몰라도 된다.

이렇게 하려면 가장 이상적인 건, VM 대로 생성하고 그대로 DOM에 적용하는 것, 이렇게 되면 VM은 View를 전혀 알 필요가 없다.

지금은 HTML을 심어넣고 나서 그걸 가져와서 사용하는 것이기 떄문에, 어떻게든 존재하는 DOM과 matching시킬 필요가 있다.

데이터를 가져올 때도, 한정적인 변화를 적용 시킬때도 필요하기 때문이다. (state갱신마다 매번 render를 요구하는 것은 너무 무거운 일이다.)

## 경량화 대안

현재 bind가 있지만, 이 bind를 제외하고 해볼까한다.

오 근데, 결국 Binder가 필요하다... render안에 VM을 넣더라도 결국 View에 binding하는 작업은 필요하기 때문이다.

음,,, 따라서 그냥 이대로 하는게 맞는 것 같다.

## 그럼 product List의 경우 어떻게 할 것인가, 계속 똑같이 그려주는 것은 어리석다.

모든 item들을 ViewModel을 달아 내려줄 것이다.

그리고 key값을 통해 diffing, 없어진 것을 delete, 새로 생긴 것을 만든다.

unique key값은 랜덤하게 만들어준다.

### 이걸 하기 싫다면?? 양방향 바인딩이 답이다.

element적으로 그린다음에, Model을 바꾸는 것이다.

# observer 제외 전략

Model이 변할 때마다 VM을 그리는게 아닌, 새로운 model을 만들고 그걸로 render를 요청하고, model에 적용시키는 것.
