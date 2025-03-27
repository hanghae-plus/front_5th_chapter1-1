(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function l(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=l(o);fetch(o.href,r)}})();const p=[{id:0,username:"홍길동",content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",createdAt:"5분전"},{id:1,username:"김철수",content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",createdAt:"15분전"},{id:2,username:"이영희",content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",createdAt:"30분전"},{id:3,username:"박민수",content:"주말에 등산 가실 분 계신가요? 함께 가요!",createdAt:"1시간전"},{id:4,username:"정수연",content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",createdAt:"2시간전"},{id:5,username:"정수1연",content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",createdAt:"21시간전"}],i=()=>!!localStorage.getItem("user"),g=()=>`
<header class="bg-blue-600 text-white p-4 sticky top-0">
<h1 class="text-2xl font-bold">항해플러스</h1>
</header>
`,u=()=>{const e=()=>!!(window.location.pathname==="/"),t=()=>!!(window.location.pathname==="/profile");return`
  ${g()}
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" id="home" class="${e()?"text-blue-600 font-bold":"text-gray-600"}">홈</a></li>
      ${i()?`<li><a href="/profile" id="profile" class="${t()?"text-blue-600 font-bold":"text-gray-600"}">프로필</a></li>`:""}
      ${i()?'<li><a href="/logout" id="logout" class="text-gray-600">로그아웃</a></li>':'<li><a href="/login" id="login" class="text-gray-600">로그인</a></li>'}
    </ul>
  </nav>
    `},b=e=>`
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center mb-2">
      <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
      <div>
        <p class="font-bold">${e.username}</p>
        <p class="text-sm text-gray-500">${e.createdAt}</p>
      </div>
    </div>
    <p>${e.content}</p>
    <div class="mt-2 flex justify-between text-gray-500">
      <button>좋아요</button>
      <button>댓글</button>
      <button>공유</button>
    </div>
  </div>
`,h=()=>`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${u()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">

          ${p.map(b).join("")}
         
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
`,n={state:{username:"",email:"",bio:""},setState(e){this.state={...this.state,...e},localStorage.setItem("user",JSON.stringify(this.state))},getState(){return JSON.parse(localStorage.getItem("user"))},deleteState(){localStorage.removeItem("user")}},m=()=>i()?(console.log("로그인페이지에서 로그인 확인"),history.pushState(null,"","/"),s.render(),f()):`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input id="userPw" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button id="로그아웃" class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `,f=()=>{if(!i())return console.log("프로필페이지에서 로그인 확인"),history.pushState(null,"","/login"),s.render("/login"),m();const e=n.getState();return console.log("user",e),`
      <div id="root">
        <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
          ${u()}
            <main class="p-4">
              <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                  내 프로필
                </h2>
                <form id="profile-form">
                  <div class="mb-4">
                    <label
                      for="username"
                      class="block text-gray-700 text-sm font-bold mb-2"
                      >사용자 이름</label
                    >
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="사용자 이름"
                      value="${e.username}"
                      class="w-full p-2 border rounded"
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      for="email"
                      class="block text-gray-700 text-sm font-bold mb-2"
                      >이메일</label
                    >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value="${e.email||""}"
                      class="w-full p-2 border rounded"
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="bio"
                      class="block text-gray-700 text-sm font-bold mb-2"
                      >자기소개</label
                    >
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      class="w-full p-2 border rounded"
                    >
  ${e.bio||""}</textarea
                    >
                  </div>
                  <button
                    type="submit"
                    class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                  >
                    프로필 업데이트
                  </button>
                </form>
              </div>
            </main>
  
            <footer class="bg-gray-200 p-4 text-center">
              <p>&copy; 2024 항해플러스. All rights reserved.</p>
            </footer>
          </div>
        </div>
    </div>
    `},x=()=>`
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`,c={"/login":m,"/":h,"/profile":f,"*":x},s={RouterType:"main",render:()=>{const e=document.getElementById("root"),t="/front_5th_chapter1-1/".replace(/\/$/,"");let l;s.RouterType==="main"?l=window.location.pathname.replace(t,"")||"/":s.RouterType==="hash"&&(l=window.location.hash.slice(1)||"/"),console.log("라우팅 path →",l);const a=c[l]||c["*"];e.innerHTML=a()}};window.addEventListener("popstate",()=>{s.render()});document.addEventListener("click",e=>{if(e.target.id==="profile"||e.target.id==="logout"||e.target.id==="login"||e.target.id==="home"){if(e.preventDefault(),e.target.textContent==="로그아웃"){localStorage.removeItem("user"),s.RouterType==="hash"?window.location.hash="/login":window.history.pushState({},"","/login"),s.render();return}console.log("e.target.href",e.target.href);const t=e.target.href.split("/").pop();console.log("path",t),s.RouterType==="hash"?(window.location.hash=t?"/"+t:"/",console.log("window.location.hash",window.location.hash)):window.history.pushState({},"",t?"/"+t:"/"),s.render()}});document.addEventListener("submit",e=>{if(e.target.id==="login-form"){e.preventDefault();const t=document.getElementById("username").value;n.setState({username:t,email:"",bio:""}),t!==""&&(history.pushState(null,"","/profile"),s.render("/profile"))}else if(e.target.id==="profile-form"){e.preventDefault(),console.log("프로필 제출");const t=document.getElementById("username").value,l=document.getElementById("email").value,a=document.getElementById("bio").value;n.setState({username:t,email:l,bio:a}),console.log("store",n.state)}});s.RouterType="main";s.render();
