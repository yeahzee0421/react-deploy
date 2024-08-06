# react-deploy

**How to start**

```
npm install
npm run start
```

**How to start MSW**

```
npm run start:MSW
```

## 📜STEP1

- [x] 서버 선택 버튼 UI 구현
- [x] 서버 선택 기능 구현

**✨Member API**

- [x] 회원가입
- [x] 로그인
- [x] 상태코드에 따른 예외처리

**✨Category API**

- [x] 카테고리 생성
- [x] 카테고리 목록 조회

**✨Product, Order API**

- [x] 상품 목록 조회
- [ ] 상품 주문

**✨Option API**

- [x] 상품 옵션 목록 조회

**✨Wish API**

- [x] 위시리스트 조회
- [x] 위시리스트 상품 등록
- [x] 위시리스트 상품 클릭시 상품 디테일 페이지로 이동
- [x] 위시리스트 상품 삭제

## 📜STEP2

gh-pages로 배포한 페이지 링크
[바로가기](https://yeahzee0421.github.io/react-deploy/)

## ✨Questions

### SPA 페이지를 정적 배포를 하려고 할 때 Vercel을 사용하지 않고 한다면 어떻게 할 수 있을까?

**정적 배포**는 build한 프로젝트를 스토리지에 올려두고, 브라우저에 접속하면 해당 스토리지 상의 주소에서 html 파일을 가져와서 보여주는 방식이다.

Vercel을 사용하지 않고 정적 배포를 할 수 있는 방법은 여러가지가 있다.

1. **Github Pages**: GitHub의 리포지토리에서 HTML, CSS 및 JavaScript 파일을 직접 가져와서 필요에 따라 빌드 프로세스를 통해 파일을 실행하고 웹 사이트를 게시하는 정적 사이트 호스팅 서비스
2. **AWS S3와 CloudFront**
   ![aws-deploy-flow](image.png)

- 스토리지: 정적 파일들을 저장하는 공간
- CDN (Content Delivery Network): 정적 파일을 전 세계 여러 서버에 분산하여 저장하고, 사용자에게 가장 가까운 서버에서 파일을 제공하여 빠른 로딩 속도를 보장한다.
- Route: 사용자 요청을 처리하고, 적절한 정적 파일을 제공하는 라우팅 설정

이외에도 Netlify와 같은 정적 호스팅 서비스가 있다.

### CSRF나 XSS 공격을 막는 방법은 무엇일까?

프론트엔드에서 로그인을 처리하는 과정에서 CSRF나 XSS 공격을 막는 방법을 생각해보자.

- **XSS 공격**: 클라이언트 브라우저에 Javascript를 삽입해 실행하는 공격. 공격자는 이 스크립트를 사용해서 자신의 사이트의 로직인 척 행동할 수 있다.
- **CSRF 공격**: 공격자가 다른 사이트에서 공격하는 사이트의 API 콜을 요청해 실행하는 공격. 공격자가 클라이언트에 저장된 인증정보를 서버에 보낼 수 있다면, 로그인하지 않아도 유저 관련 액션들을 수행할 수 있다.

**안전한 브라우저 저장 방식**

- 쿠키 저장 방식
  - 쿠키에 refreshToken만 저장하고 이를 사용해 새로운 accessToken을 받아와 인증에 사용하는 구조에서 CSRF 취약점 공격을 방어할 수 있다.
  - 새롭게 받아온 accessToken을 스크립트에 삽입할 수 없다면 이를 악용해 유저 정보를 가져올 수 없기 때문.
- secure httpOnly 쿠키 저장 방식
  - secure을 적용하면 https 접속에서만 동작하므로 Javascript 내에서 접근이 불가능하다. XSS 공격을 방지할 수 있다. 쿠키 저장 방식과 마찬가지로 refreshToken만 저장하고 accessToken을 받아오기 때문에 CSRF 공격 방어도 가능하다.

### 브라우저 렌더링 원리는 무엇일까?

브라우저 렌더링 원리는 크게 렌더링 엔진, 렌더 트리, 레이아웃, 그리고 페인팅으로 구성된다.

- **렌더링 엔진**: 웹페이지를 불러올 때 HTML, CSS, JavaScript와 같은 웹 페이지의 요소들을 파싱한다.
- **렌더 트리**: 렌더링 엔진이 파싱한 HTML, CSS와 같은 웹 페이지의 요소들을 이용하여 구성한 트리 구조. 브라우저가 화면에 표시할 요소를 정의한다.
- **레이아웃**: 렌더 트리를 이용하여 브라우저의 화면에 요소들을 배치하는 과정이다. 각 요소의 위치, 크기나 간격 등을 계산한다.
- **페인팅**: 브라우저는 렌더링 엔진에서 계산된 정보를 이용하여 브라우저 화면에 그래픽 요소들을 표시한다.
