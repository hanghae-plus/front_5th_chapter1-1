(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) l(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const n of r.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && l(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function l(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = a(s);
    fetch(s.href, r);
  }
})();
const d = () => !!localStorage.getItem("user"),
  u = () => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
`,
  m = (e) => `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${e === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
      <li><a href="/profile" class="${e === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
      ${d() ? '<li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>' : '<li><a href="/login" class="text-gray-600">로그인</a></li>'}
    </ul>
  </nav>
`,
  b = (e) => `
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
`,
  g = [
    {
      id: 0,
      username: "홍길동",
      content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
      createdAt: "5분전",
    },
    {
      id: 1,
      username: "김철수",
      content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
      createdAt: "15분전",
    },
    {
      id: 2,
      username: "이영희",
      content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
      createdAt: "30분전",
    },
    {
      id: 3,
      username: "박민수",
      content: "주말에 등산 가실 분 계신가요? 함께 가요!",
      createdAt: "1시간전",
    },
    {
      id: 4,
      username: "정수연",
      content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
      createdAt: "2시간전",
    },
  ],
  f = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${u()}
      ${m("/")}

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
          ${g.map(b).join("")}
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
`,
  p = () =>
    d()
      ? (o.RouterType === "hash"
          ? window.history.replaceState({}, "", "#/")
          : window.history.replaceState({}, "", "/"),
        f())
      : `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`,
  i = {
    data: {},
    setData(e, t) {
      (this.data[e] = t),
        localStorage.setItem(e, JSON.stringify(t)),
        o.Render();
    },
    getData(e) {
      return JSON.parse(localStorage.getItem(e));
    },
  },
  h = () => {
    if (!d())
      return (
        o.RouterType === "hash"
          ? window.history.replaceState({}, "", "#/login")
          : window.history.replaceState({}, "", "/login"),
        p()
      );
    const e = i.getData("user");
    return `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${u()}
        ${m("/profile")}

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
                  value="${e.email}"
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
                >${e.bio}</textarea>
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
  `;
  },
  x = () => `
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
`,
  c = { "/": f, "/profile": h, "/login": p, "*": x },
  o = {
    RouterType: "basic",
    Render: () => {
      const e = document.getElementById("root");
      let t;
      o.RouterType === "basic"
        ? (t = window.location.pathname)
        : o.RouterType === "hash" && (t = window.location.hash.slice(1));
      const a = c[t] || c["*"];
      e.innerHTML = a();
    },
  };
window.addEventListener("popstate", () => {
  o.Render();
});
document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    if ((e.preventDefault(), e.target.textContent === "로그아웃")) {
      localStorage.removeItem("user"),
        o.RouterType === "hash"
          ? (window.location.hash = "/login")
          : window.history.replaceState({}, "", "/login"),
        o.Render();
      return;
    }
    const t = e.target.href.split("/").pop();
    o.RouterType === "hash"
      ? (window.location.hash = t ? "/" + t : "/")
      : window.history.pushState({}, "", t || "/"),
      o.Render();
  }
});
document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();
    const t = document.getElementById("username").value;
    t
      ? i.setData("user", { username: t, email: "", bio: "" })
      : alert("이메일 또는 전화번호를 입력해주세요.");
  } else if (e.target.id === "profile-form") {
    e.preventDefault();
    const t = document.getElementById("username").value,
      a = document.getElementById("email").value,
      l = document.getElementById("bio").value;
    i.setData("user", { username: t, email: a, bio: l });
  }
});
window.addEventListener("hashchange", () => {
  o.Render();
});
o.RouterType = "hash";
o.Render();
