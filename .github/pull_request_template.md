## 과제 체크포인트

### 배포 링크

<!--
배포 링크를 적어주세요
예시: https://<username>.github.io/front-5th-chapter1-1/

배포가 완료되지 않으면 과제를 통과할 수 없습니다.
배포 후에 정상 작동하는지 확인해주세요.
-->


### 기본과제

#### 1) 라우팅 구현:
- [x] History API를 사용하여 SPA 라우터 구현
  - [x] '/' (홈 페이지)
  - [x] '/login' (로그인 페이지)
  - [x] '/profile' (프로필 페이지)
- [x] 각 라우트에 해당하는 컴포넌트 렌더링 함수 작성
- [x] 네비게이션 이벤트 처리 (링크 클릭 시 페이지 전환)
- [x] 주소가 변경되어도 새로고침이 발생하지 않아야 한다.

#### 2) 사용자 관리 기능:
- [x] LocalStorage를 사용한 간단한 사용자 데이터 관리
  - [x] 사용자 정보 저장 (이름, 간단한 소개)
  - [x] 로그인 상태 관리 (로그인/로그아웃 토글)
- [x] 로그인 폼 구현
  - [x] 사용자 이름 입력 및 검증
  - [x] 로그인 버튼 클릭 시 LocalStorage에 사용자 정보 저장
- [x] 로그아웃 기능 구현
  - [x] 로그아웃 버튼 클릭 시 LocalStorage에서 사용자 정보 제거

#### 3) 프로필 페이지 구현:
- [x] 현재 로그인한 사용자의 정보 표시
  - [x] 사용자 이름
  - [x] 간단한 소개
- [x] 프로필 수정 기능
  - [x] 사용자 소개 텍스트 수정 가능
  - [x] 수정된 정보 LocalStorage에 저장

#### 4) 컴포넌트 기반 구조 설계:
- [x] 재사용 가능한 컴포넌트 작성
  - [x] Header 컴포넌트
  - [x] Footer 컴포넌트
- [x] 페이지별 컴포넌트 작성
  - [x] HomePage 컴포넌트
  - [x] ProfilePage 컴포넌트
  - [x] NotFoundPage 컴포넌트

#### 5) 상태 관리 초기 구현:
- [x] 간단한 상태 관리 시스템 설계
  - [x] 전역 상태 객체 생성 (예: 현재 로그인한 사용자 정보)
- [x] 상태 변경 함수 구현
  - [x] 상태 업데이트 시 관련 컴포넌트 리렌더링

#### 6) 이벤트 처리 및 DOM 조작:
- [x] 사용자 입력 처리 (로그인 폼, 프로필 수정 등)
- [x] 동적 컨텐츠 렌더링 (사용자 정보 표시, 페이지 전환 등)

#### 7) 라우팅 예외 처리:
- [x] 잘못된 라우트 접근 시 404 페이지 표시

### 심화과제

#### 1) 해시 라우터 구현
- [x] location.hash를 이용하여 SPA 라우터 구현
  - [x] '/#/' (홈 페이지)
  - [x] '/#/login' (로그인 페이지) 
  - [x] '/#/profile' (프로필 페이지)
 
#### 2) 라우트 가드 구현
- [x] 로그인 상태에 따른 접근 제어
- [x] 비로그인 사용자의 특정 페이지 접근 시 로그인 페이지로 리다이렉션

#### 3) 이벤트 위임

- [x] 이벤트 위임 방식으로 이벤트를 관리하고 있다.

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 기술적 성장
<!-- 예시
- 새로 학습한 개념
- 기존 지식의 재발견/심화
- 구현 과정에서의 기술적 도전과 해결
-->
자바스크립트 라우팅 매커니즘 이해: SPA에서 History API와 해시 기반 라우팅의 차이점을 이해했습니다. 특히 'history.pushState' 와 해시 방식의 작동 원리를 실제 구현하면서 명확히 파악할 수 있었습니다.
Router를 처리하면서 hash router 와 browser router 각자 구현했습니다. `main.js.bak`, `main.hash.bak` 파일에 먼저 작성을 했는데 공통된 코드가 너무 많이 나왔고 개선이 필요하다고 생각했습니다. 그래서 Class의 상속 개념을 사용해보기로했습니다 .
`Router.basic.js`에 우선적으로 `Router.browser.js` 와 `Router.hash.js` 에서 사용되는 공통 코드를 작성했습니다. 그렇게 사용하니 코드 수가 줄어들고 기존 소스 보다 더 깔끔해지게 만들 수 있었습니다. 그리고 해당 라우터들에게 접근하기 위해서 팩토리 패턴을 적용해보려고 했습니다. Router 디렉토리의 `index.js`에 `type`에 따라서 접근 할 수 있도록 처리했습니다. 

`gh-page`에 배포하는 과정에서 많은 어려움을 겪었는데요 `spa`에서 배포하는 과정 중에서 `404`에러가 엄청 많이 발생하였습니다. 해당 경로를 찾지 못해서 발생한 에러 메세지인 것을 알고 있었지만, google에 있는 `404` 페이지를 회피하는 방법만 사용할 뿐 근원적인 방법을 해결할 생각을 하지 못했습니다. 기본적인 문제는 저의 `route path`가 `"/{path}"`
 => `"{reponame}/{path}"` 의 형태가 되어야 함을 알 수 있었습니다. 하지만 해당 코드가 너무 더러워서.. 리팩토링을 더 하거나 다른 방법을 찾고 싶지만 그러지 못해서 아쉽습니다.  

### 코드 품질
<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

우선 저의 src 구조를 공유 드리겠습니다.
```shell
├── __tests__
│   ├── advanced.hashRouter.test.js
│   ├── advanced.test.js
│   └── basic.test.js
├── components
│   ├── Footer.js
│   ├── Header.js
│   ├── Nav.js
│   └── Post.js
├── lib
│   ├── globalState.js
│   └── setEvent.js
├── main.hash.js
├── main.hash.js.bak
├── main.js
├── main.js.bak
├── model
│   └── dummyData.js
├── pages
│   ├── ErrorPage.js
│   ├── LoginPage.js
│   ├── MainPage.js
│   └── ProfilePage.js
├── routes
│   ├── BaseRouter.js
│   ├── BrowserRouter.js
│   ├── HashRouter.js
│   ├── Router.basic.js
│   ├── Router.browser.js
│   ├── Router.hash.js
│   └── index.js
├── services
│   └── authService.js
└── setupTests.js


```

</hr>
기술적 성장에서 한 `Router`를 클래스로 나누고 코드를 재활용한게 마음에 들었습니다. 코드양이 줄어들고 , 잘 작동한다는 것에 쾌감을 느낄 수 있었고 1팀 인원들과 학메님이 리팩토링을 도와주셔서 더 개선될 수 있었던 점 이 좋았습니다. 그리고 두번째로 마음에 들었던 건 authGuard와  이벤트 처리 로직이 하나로 뭉쳐있는 코드가 존재했는데 해당 부분을 수정한게 마음에 들면서도 아쉬움이 있었습니다.

```js
//페이지 이동함수
const navigateTo = (path) => {
  console.log("navigateTo", path);
  // 여기서 spa pushState 추가.
  history.pushState(null, "", path);
  //페이지 렌더링
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = renderPage(path);

  // 로그인 페이지일 때 이벤트 리스너 등록
  if (path === BASE_URL + "login") {
    const userData = globalState.getUser("user");
    if (userData) {
      navigateTo(BASE_URL + "profile");
      return;
    }
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }
  }

  if (path === BASE_URL + "profile") {
    const loginInfo = globalState.getUser("user");
    console.log("loginInfo", loginInfo);
    if (!loginInfo) {
      navigateTo(BASE_URL + "login");
      return;
    }
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", handleUpdateProfile);
    }
  }

  if (path !== BASE_URL + "login" && path !== BASE_URL + "logout") {
    console.log("login or logout");
    const navElement = document.querySelector("nav");

    if (navElement) {
      navElement.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
          handleLinkClick(event);
        }
      });
    }
  }
};
```
이게 처음 만들었던 코드였는데 이 코드에는 여러가지 문제가 있다고 생각했습니다.
* 이 함수에 너무 많은 역할이 담당되어 있다.
   1. render 기능 
   2. authGuard 기능 
   3. 데이터 submit 기능

이 문제를 해결하고자 처음에 두군데로 분리했습니다.
<br>
*render*
```js
//handleRoute 구현 필수
handleRoute(element, path) {
  console.log("해시 라우터: handleRoute", path);
  const renderElement = document.getElementById(element);
  if (renderElement) {
    renderElement.innerHTML = this.renderPage(path);
    this.setupPageListeners(path);
  }
}

//authGuard형태로 표시하고 싶지만 일단 우선은 구현에 초점
setupPageListeners(path) {
  console.log("setupPageListeners path", path);
  this.currentPath = path;
  const userData = globalState.getUser("user");

  if (path === "/login") {
    if (userData) {
      this.navigateTo("/");
      return;
    }
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.removeEventListener("submit", this.handleLogin);
      loginForm.addEventListener("submit", this.handleLogin);
    }
  }

  // 프로필 페이지 리스너
  if (path === "/profile" && !userData) {
    this.navigateTo("/login");
    return;
  } else {
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.removeEventListener("submit", this.handleUpdateProfile);
      profileForm.addEventListener("submit", this.handleUpdateProfile);
    }
  }

  //네비게이션 리스너 (로그인, 로그아웃 페이지 제외)
  if (path !== "/login") {
    console.log("nav 이벤트 리스너 등록");
    const navElement = document.querySelector("nav");
    if (navElement) {
      navElement.removeEventListener("click", this.handleLinkClick);
      navElement.addEventListener("click", this.handleLinkClick);
    }
  }
}
여기서 발생한 문제점은 authGuard가 처리되는 곳이 renderPage이후에 있어서 page 이동시 정상 작동하는 곳도 아닌곳도 있었습니다.
그래서 authGuard를 분리하고 handleRouter 렌더링 전에 추가하였습니다.
```
*authGuard Router.basic.js*
```js
//authGuard 생성
authGuard(path) {
  const userData = globalState.getUser("user");
  //프로필 페이지 접근 시 인증 필요
  // 프로필 페이지 접근 시 인증 필요
  if (path === "/profile" && !userData) {
    console.log("인증 필요: 프로필 페이지 접근 시도");
    //여기서 navigateTo를 실행할 경우 테스트 통과가 되지 못하였다 why?
    // return this.navigateTo("/login");
    return "/login"; // 리다이렉트할 경로 반환
  }

  // 로그인 페이지에 이미 로그인한 상태로 접근 시
  if (path === "/login" && userData) {
    console.log("이미 로그인됨: 로그인 페이지 접근 시도");
    return "/"; // 홈으로 리다이렉트
  }

  if (path === "/logout") {
    console.log("로그아웃 처리");
    authService.logout();
    return "/login";
  }

  // 인증 통과 또는 인증이 필요 없는 페이지
  return null; // 리다이렉트 필요 없음
}

//handleRoute 구현 필수
handleRoute(element, path) {
  const redirectPath = this.authGuard(path);
  if (redirectPath) {
    console.log("인증 실패: 리다이렉트", redirectPath);
    this.navigateTo(redirectPath);
    return; // 렌더링 중단
  }
  // 인증 통과 또는 다른 페이지인 경우 렌더링 계속 진행
  const renderElement = document.getElementById(element);
  if (renderElement) {
    renderElement.innerHTML = this.renderPage(path);
    this.setupPageListeners(path);
  }
}

setupPageListeners(path) {
  console.log("setupPageListeners path", path);
  this.currentPath = path;

  if (path === "/login") {
    // 로그인 관련 인증 검사 코드 제거 (이미 authGuard에서 처리)
    loginFormSubmitEvent(this.handleLogin);
  }

  // 프로필 페이지 리스너
  if (path === "/profile") {
    // 프로필 관련 인증 검사 코드 제거 (이미 authGuard에서 처리)
    profileFormSubmitEvent(this.handleUpdateProfile);
  }

  //네비게이션 리스너 (로그인, 로그아웃 페이지 제외)
  if (path !== "/login") {
    console.log("nav 이벤트 리스너 등록");
    navLinkClickEvent(this.handleLinkClick);
  }
}

이벤트를 등록하는 부분은 위와 같이 변경하였습니다. 그러고 나니 코드가 조금 깔끔해진 거 같아요.

```

마지막으로 리팩토링은 모든 곳에 필요해보이는데요 그 중에서 고르자면
```js
src > lib > setEvent.js

export const loginFormSubmitEvent = (event) => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.removeEventListener("submit", event);
    loginForm.addEventListener("submit", event);
  }
};

export const profileFormSubmitEvent = (event) => {
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.removeEventListener("submit", event);
    profileForm.addEventListener("submit", event);
  }
};

export const navLinkClickEvent = (event) => {
  const navLink = document.querySelector("nav");
  if (navLink) {
    navLink.removeEventListener("click", event);
    navLink.addEventListener("click", event);
  }
};

src > routes > router.basic.js
//헤더 링크 클릭 (로직이 거의 동일한데 살짝 다름 95% 동일)
handleLinkClick = (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const href = this.cleanPath(event.target.getAttribute("href"));
    const path = href.includes("#")
            ? href.split("#")[1]
            : this.cleanPath(href);
    if (this.cleanPath(href) === "/logout" || path === "/logout") {
      // 로그아웃 처리 로직
      authService.logout();
      this.navigateTo("/login");
      return;
    }
    this.navigateTo(href);
  }
};

//로그인 처리 (거의 동일), 이것도 여기 있는게 맞을까? 라우터인데.?
handleLogin = (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  const username = document.getElementById("username").value;
  const password = document.getElementById("userPw").value;
  if (authService.login(username, password)) {
    this.navigateTo("/profile");
  } else if (!username || !password) {
    alert("이름 또는 비밀번호를 입력해주세요.");
  } else {
    alert("이름 또는 비밀번호가 일치하지 않습니다.");
  }
};

//profile update 처리 프로필 업데이트인데 이것도 여기 있는게 맞을까?
handleUpdateProfile = (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const bio = document.getElementById("bio").value.trim();

  if (username) {
    const user = {
      username: username,
      email: email,
      bio: bio,
    };

    globalState.setUser("user", user);
    // window.location.reload();
    this.navigateTo("/profile");
  }
};
```
적다 보니 거의 모든 것이네요.. 이  부분을 고른 이유는 위에 `lib>setEvent.js`는 제가 생각하기에는 컴포넌트에 종속된 이벤트 들이라고 생각했는데요. 이 걸 어떻게 컴포넌트 안에 녹여 낼지가 고민이 되었습니다. 하지만 잘 안되서 과감하게 포기하고 module 형태로 분리하였습니다. 근데 module형태로 분리하니 코드가 한군데 모여서 보기 편하긴한거 같은데, 이게 어느 tag와 매칭되는지 알기가 힘들다는 단점이 있었습니다. 

`router.basic.js` 파일은 이것도 컴포넌트에 종속적이다. 근데 `router`에 두는게 맞는거 같다. 아니면 둘을 분리할 수는 없을까? 하는 생각이 들었습니다. `handleLinkClick`은 기능이 `navigate`해주는 기능을 가지고 있으니, 이곳에 둬도 될 거 같지만 다른 `handleLogin`과 `handleUpload`는 로그인 과 프로필 업데이트 기능도 가지고 있기 때문에  리팩토링이 필요한거 같습니다. 
> 이 글을 적다보니 handleLinkClick도 개선점이 더 많이 보이네요. 이곳에도  authGuard가 적용되도록 handleRoute 함수를 적용해보면 어떨지 궁금해졌습니다. 

### 학습 효과 분석
<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->
기본 자바스크립트를 더 깊게 공부해야겠다는 생각이 들었습니다. 아직 모르는게 많았고 특히 디자인 패턴과 모듈화를 더 잘하는법 그리고 자바스크립트 이벤트에 대해서 더 공부해야겠다고 생각했습니다. 실무 적용 방법은 historyAPI를 보고 reactRouter를 보니 replace 함수가 있더라구요. 그래서 이 replace가 history함수의 replace와 동일한 역할을 하는 구나 라는 생각이 들면서 뭔가 뿌듯했습니다. 벌써 교육이 실무에 반영되는거 같아서 뿌듯함을 느낄 수 있었습니다.
### 과제 피드백
<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->
과제에서 좋았던 부분은 오랜만에 열정적으로 코딩할 수 있었던 점 , 그리고 인생에서 오랜만에 이렇게 불태웠다 어떤 결과여도 받아드릴 수 있다.라고 생각될 만큼 스스로에게 당당하게 노력했다는 점이고 이건 개인적인 만족입니다. 그리고 생각보다 너무 어려웠고 자바스크립트 기본기에 대해서 다시 생각해보게되었어요. 이론과 현실은 완전히 다르다는 것도 알게 되었습니다. 머리속에 어설픈 개념은 사용할 수 있는게 아니라는 것을 다시 한번 느낄 수 있었고 더 많이 사용하고 익숙해져야겠다고 생각했습니다.

## 리뷰 받고 싶은 내용
1. `routes > index.js`에 팩토리 디자인 패턴이라고 생각하고 구현을 해봤는데 제가 작성한 부분도 팩토리패턴으로 볼 수 있을까요?
2. `Component` 에 종속되는 것 같은 함수들이 `submit과 click`함수들 router에 함께 적용 되어 있어서 추후 유지보수가 정말 힘들거 같은데 어떤 패턴으로 이런 문제를 해결 할 수 있을까요?
3. `authService`를 구현해봤는데 여기서 `state`가 `authService`에서 제대로 사용됬을까요? 그리고 `handleLogin`함수에서 if문의 조건처리를 authService.login의 리턴값을 받아서 사용하는데 개선할 수 있는 방향이 있을까요? 이런 질문을 한 이유는 authService.login 자체가 boolean타입을 반환하는 것 같지 않습니다. 그리고 확인하는 기능이 두개 추가가 되어 있는 것 처럼 보입니다. 1.state에 user정보 업데이트 2. login 여부 return 
<!--
피드백 받고 싶은 내용을 구체적으로 남겨주세요
모호한 요청은 피드백을 남기기 어렵습니다.

참고링크: https://chatgpt.com/share/675b6129-515c-8001-ba72-39d0fa4c7b62

모호한 질문의 예시)
- 무엇을 질문해야 할지 몰라서 코치님이 보시기에 고쳐야할것들 전반적으로 피드백 부탁드립니다.
- 코드 스타일에 대한 피드백 부탁드립니다.
- 코드 구조에 대한 피드백 부탁드립니다.
- 개념적인 오류에 대한 피드백 부탁드립니다.
- 추가 구현이 필요한 부분에 대한 피드백 부탁드립니다.

구체적인 질문의 예시)
- 파일A의 함수B와 그 안의 변수명을 보면 직관성이 떨어지는 것 같습니다. 함수와 변수 이름을 더 명확하게 지을 방법에 대해 조언해 주실 수 있나요?
- 현재 파일 단위로 코드를 분리했지만, 이번 주차 발제를 기준으로 봤을 때 모듈화나 계층화에서 부족함이 있는 것 같습니다. 특히 A와 B 부분에서 모듈화를 더 진행할지 그대로 둘지 고민하였습니다. (...구체적인 고민 사항 적기...). 코치님의 의견이 궁금합니다.
- 옵저버 패턴을 사용해 상태 관리 로직을 구현해 보려 했습니다. 제가 구현한 코드가 옵저버 패턴에 맞게 잘 구성되었는지 검토해 주시고, 보완할 부분을 제안해 주실 수 있을까요?
- 컴포넌트 A를 테스트 할 때 B와의 의존성 때문에 테스트 코드를 작성하려다 포기했습니다. A와 B의 의존성을 낮추고 테스트 가능성을 높이는 구조 개선 방안이 있을까요?
-->
