const Header = (/*html*/) => {
  const loggedIn = isLoggedIn();

  function isLoggedIn() {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData !== null;
  }

  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  const isProduction = import.meta.env.MODE === "production";
  const BASE = isProduction ? "/front_5th_chapter1-1" : "";

  let home = "/";
  let profile = "/profile";
  let login = "/login";

  let baseHome;
  let baseProfile;
  let baseLogin;

  // 배포모드일때
  if (BASE != "") {
    baseHome = BASE + home;
    baseProfile = BASE + profile;
    baseLogin = BASE + login;
  } else {
    baseHome = home;
    baseProfile = profile;
    baseLogin = login;
  }
  // console.log(currentPath);
  // console.log(currentHash);
  // console.log(process.env.NODE_ENV);
  // console.log(import.meta.env.MODE);
  console.log(currentPath + " | " + baseHome);
  console.log(currentPath + " | " + baseProfile);

  return `
    <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="${currentPath === baseHome || currentHash == "#/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
            </li>
            ${
              loggedIn
                ? `<li><a href="/profile" class="${currentPath === baseProfile || currentHash == "#/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
                <li><a href="/login" id='logout' class="${currentPath === baseLogin || currentHash == "#/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그아웃</a></li>
              `
                : `<li><a href="/login" class="${currentPath === baseLogin || currentHash == "#/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그인</a></li>`
            }
          </ul>
        </nav>
  `;
};

export default Header;
