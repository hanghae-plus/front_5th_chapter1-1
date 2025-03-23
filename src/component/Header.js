//design
const BLUETEXT = "text-blue-600";
const GRAYTEXT = "text-gray-600";

export const Header = (loginState) => /* HTML */ {
  setTimeout(() => {
    const logout = document.getElementById("logout");
    console.log(logout);
    logout.addEventListener(
      "click",
      console.log("sdfsdf"),
      // localStorage.setItem("loggedIn", JSON.parse(false)),
    );
  }, 0);
  const nav =
    loginState === true
      ? `<nav class="bg-white shadow-md p-2 sticky top-14">
	  <ul class="flex justify-around">
		<li>
		  <a href="/" class=${location.pathname === "/" ? BLUETEXT : GRAYTEXT}
			>홈</a
		  >
		</li>
		<li>
		  <a
			href="/profile"
			class=${location.pathname === "/profile" ? BLUETEXT : GRAYTEXT}
			>프로필</a
		  >
		</li>
		<li>
		  <a id="logout"href="#" class=${GRAYTEXT}>로그아웃</a>
		</li>
	  </ul>
	</nav>`
      : `<nav class="bg-white shadow-md p-2 sticky top-14">
	  <ul class="flex justify-around">
		<li>
		  <a href="/" class=${location.pathname === "/" ? BLUETEXT : GRAYTEXT}
			>홈</a
		  >
		</li>
	  
		</li>
		<li>
		  <a href="login" class=${GRAYTEXT}>로그인</a>
		</li>
	  </ul>
	</nav>`;

  return `
	<header class="bg-blue-600 text-white p-4 sticky top-0">
	  <h1 class="text-2xl font-bold">항해플러스</h1>
	</header>
	${nav}
  `;
};
