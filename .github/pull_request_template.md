## 과제 체크포인트
### 배포 링크
https://jungtaesu.github.io/front_5th_chapter1-1/

<!-- gh-pages 배포할땐 vite.config.js 
// import { defineConfig } from "vite";

// export default defineConfig({
//   base: "/front_5th_chapter1-1/",
// });
이 상태로 npm run deploy 해야 github -> settings -> pages 에 반영이 된다.


 -->

### 기본과제
#### 1) 라우팅 구현:
- [ ] History API를 사용하여 SPA 라우터 구현
  - [ ] '/' (홈 페이지)
  - [ ] '/login' (로그인 페이지)
  - [ ] '/profile' (프로필 페이지)
- [ ] 각 라우트에 해당하는 컴포넌트 렌더링 함수 작성
- [ ] 네비게이션 이벤트 처리 (링크 클릭 시 페이지 전환)
- [ ] 주소가 변경되어도 새로고침이 발생하지 않아야 한다.
#### 2) 사용자 관리 기능:
- [ ] LocalStorage를 사용한 간단한 사용자 데이터 관리
  - [ ] 사용자 정보 저장 (이름, 간단한 소개)
  - [ ] 로그인 상태 관리 (로그인/로그아웃 토글)
- [ ] 로그인 폼 구현
  - [ ] 사용자 이름 입력 및 검증
  - [ ] 로그인 버튼 클릭 시 LocalStorage에 사용자 정보 저장
- [ ] 로그아웃 기능 구현
  - [ ] 로그아웃 버튼 클릭 시 LocalStorage에서 사용자 정보 제거
#### 3) 프로필 페이지 구현:
- [ ] 현재 로그인한 사용자의 정보 표시
  - [ ] 사용자 이름
  - [ ] 간단한 소개
- [ ] 프로필 수정 기능
  - [ ] 사용자 소개 텍스트 수정 가능
  - [ ] 수정된 정보 LocalStorage에 저장
#### 4) 컴포넌트 기반 구조 설계:
- [ ] 재사용 가능한 컴포넌트 작성
  - [ ] Header 컴포넌트
  - [ ] Footer 컴포넌트
- [ ] 페이지별 컴포넌트 작성
  - [ ] HomePage 컴포넌트
  - [ ] ProfilePage 컴포넌트
  - [ ] NotFoundPage 컴포넌트
#### 5) 상태 관리 초기 구현:
- [ ] 간단한 상태 관리 시스템 설계
  - [ ] 전역 상태 객체 생성 (예: 현재 로그인한 사용자 정보)
- [ ] 상태 변경 함수 구현
  - [ ] 상태 업데이트 시 관련 컴포넌트 리렌더링
#### 6) 이벤트 처리 및 DOM 조작:
- [ ] 사용자 입력 처리 (로그인 폼, 프로필 수정 등)
- [ ] 동적 컨텐츠 렌더링 (사용자 정보 표시, 페이지 전환 등)
#### 7) 라우팅 예외 처리:
- [ ] 잘못된 라우트 접근 시 404 페이지 표시
### 심화과제
#### 1) 해시 라우터 구현
- [ ] location.hash를 이용하여 SPA 라우터 구현
  - [ ] '/#/' (홈 페이지)
  - [ ] '/#/login' (로그인 페이지)
  - [ ] '/#/profile' (프로필 페이지)
#### 2) 라우트 가드 구현
- [ ] 로그인 상태에 따른 접근 제어
- [ ] 비로그인 사용자의 특정 페이지 접근 시 로그인 페이지로 리다이렉션
#### 3) 이벤트 위임
- [ ] 이벤트 위임 방식으로 이벤트를 관리하고 있다.
## 과제 셀프회고
<!-- 과제에 대한 회고를 작성해주세요 -->

주요 토픽
1. 프레임워크 없이 SPA를 완성한다는 것.
사실 개발을 처음 배웠을때 부터 react를 사용하고 그 후에는 react의 프레임워크인 nextjs를 사용했었으니
사실 바닐라js만을 이용해 웹 어플리케이션을 만든다는게 큰 챌린지 였던 것 같습니다.
ex) hash 와 router 가 가장 크게 어려웠?던 부분 같아요.

2. 폴더 구조
이건 배웠다기보다는 다들 가장 많이 사용하는 src -> pages , components, utils, 등등

### 기술적 성장
<!-- 예시
- 새로 학습한 개념
- 기존 지식의 재발견/심화
- 구현 과정에서의 기술적 도전과 해결
-->

해시 라우터 부분이 특히 힘들었습니다. 원래는 import router from 'userRouter' 이렇게만 사용을 했었어서 그저 import만 하면
끝나는 기능이 router 였는데 이렇게 history API 그리고 hash를 동시에 구현하는것이 성장했다고 생각합니다.

해시 라우팅 vs 히스토리 라우팅
React Router 같은 클라이언트 라우터를 사용할 때, 두 가지 방식이 있어:
해시 라우팅 (Hash Routing)
window.location.hash를 사용해 페이지를 변경함.
예: window.location.hash = "/login"; → URL이 http://example.com/#/login으로 변경됨.
브라우저가 서버에 새로운 요청을 보내지 않고 클라이언트에서 경로를 감지해서 화면을 바꿈.
히스토리 라우팅 (History API Routing)
window.history.pushState()를 사용해 페이지를 변경함.
예: window.history.pushState({}, "", "/login"); → URL이 http://example.com/login으로 변경됨.
이 방식은 브라우저의 히스토리 스택에 새 상태를 추가하지만, 해시 라우팅처럼 #을 사용하지 않음.

### 코드 품질
<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

리팩토링을 마무리했다는 것 자체가 만족스럽습니다...
아직 품질에 대해서 논할수 있나 싶습니다..ㅎㅎ

### 학습 효과 분석
<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->
내가 nextjs에서 useRouter로 끌어서 사용하던 부분이 사실 이런 원리로 동작하는구나 라는 걸 알수 있었고,

### 과제 피드백
<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->

아마 제가 부족해서 생긴 이슈이겠지만 testCode가 조금 더 친절..?했음 좋겠다? 말고는 없습니다.
음 디코에도 남겨놨던 내용이긴 했는데 어쨋든 렌더링 순서 이슈로 인해 null로 잡힌 객체를 참조하려다가 생긴 testcode에서의 에러였지만
login화면으로 가야 basic에선 통과하고, home으로 가야 e2e테스트에서 통과하는 (물론 제가 더 빨리 buttonClicked event에 대한 정리를 더 깔끔하게 했다면 안생겼을 수도..) 현상을 목격해서 한번 적어봤습니다!
결국 해결은 각 로그인/로그아웃/프로필/홈 으로 가는 버튼들에 대한 이벤트 정리를 깔끔하게 하니까 해결된 이슈였씁니다.

아래 코드에서 로그아웃 할때 부분입니다.

document.addEventListener("click", (e) => {
  if (e.target.id === "profile") {
    console.log("profile클릭!!");
    window.history.pushState(null, "", "/profile");
    Router.render("/profile");
  } else if (e.target.id === "logout") {
    console.log("로그아웃");
    // localStorage.removeItem('user')
    store.deleteState();
    history.pushState(null, "", "/");
    Router.render("/");
  } else if (e.target.id === "login") {
    console.log("로그인");
    window.history.pushState(null, "", "/login");
    Router.render("/login");
  } else if (e.target.id === "home") {
    console.log("홈");
    window.history.pushState(null, "", "/");
    Router.render("/");
  }
});

## 리뷰 받고 싶은 내용

1. 제 pr 로그중 하나가 (profile - 이슈 해결중) localStorage 관련한 내용을 중앙관리하지않고 필요할때마다 작성하는 방식으로 user에 대한 정보를 다뤘는데,
이 방식이 어딘가 틀린지 모른 상태로 뭔가 localStorage를 계속해서 호출하는 게 문제가 생기수 있겠단 추측으로 store/index.js를 만들어서
거기서 관리해주는 방식으로 바꾸니까 에러가 해결이 되었는데 이러한 이유로 중앙관리를 해야한다는 건 알고 있는데 제가 느낀게 맞는지 궁금합니다.
(1) 중앙관리를 하는 이유는 디버깅이 편하다
(2) 중앙관리를 하는 이유는 매번 호출하는 대상을 더 일관적(?) 호출이 가능하다?
(3) 사실 웹 기능상 봤을때는 웹 브라우저에서는 기능구현이 잘 되었는데 testcode에서 통과가 안된 부분이라 의아합니다.

2. 사실 저는 vscode에서 디버깅 기능을 거의 사용을 안해서 뭔가 console만으로 다 해결을 하는데 개발자로서 약간은 잘못된 부분..인것 같습니다.
귀찮기도 하고, 사실 console에서 찍어보면 다 나오는데 굳이 라는 ..?

3. eventListener 부분에서

const loginForm = document.getElementById("login-form"); 이렇게 지정해준 상태에서 

loginForm.addEventListner()...
하는것과

submit 버튼이 두개인 상태에서 submit버튼에대한 이벤틀르 작성하는것이
document.addEventListener("submit", (e) => {

기능적으로 크게 다른건지 아니면 submit에 대해서 전부 event 등록을 해주더라도 조건문으로 해결하면 기능적 차이가 없는건지 궁금합니다!
