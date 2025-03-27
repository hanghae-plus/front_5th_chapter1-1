import { getDeployUrl } from "../core/getDeployUrl";
import getRouterMode from "../core/getRouterMode";
import User from "../store/user";

const BLUETEXT = "text-blue-600 font-bold";
const GRAYTEXT = "text-gray-600";

let DEPLOY_URL = getDeployUrl();

export const Header = () => /* HTML */ {
  const isLogin = new User().isLogin();
  let isHashMode = getRouterMode() === "hash";

  const nav = isLogin
    ? `<nav class="bg-white shadow-md p-2 sticky top-14">
	  <ul class="flex justify-around">
		<li>
<a href="/" 
   class="${
     (
       isHashMode
         ? location.hash === "#/" || location.hash === "#/login"
         : location.pathname === `${DEPLOY_URL}/` ||
           location.pathname === `${DEPLOY_URL}/login`
     )
       ? BLUETEXT
       : GRAYTEXT
   }">			홈</a
		  >
		</li>
		<li>
		  <a
			href="/profile"
			class="${location.pathname === `${DEPLOY_URL}/profile` || location.hash === "#/profile" ? BLUETEXT : GRAYTEXT}"
			>프로필</a
		  >
		</li>
		<li>
		  <a id="logout" href="#" class=${GRAYTEXT}>로그아웃</a>
		</li>
	  </ul>
	</nav>`
    : `<nav class="bg-white shadow-md p-2 sticky top-14">
	  <ul class="flex justify-around">
		<li>
		  <a href="/" class="${location.pathname === `${DEPLOY_URL}/` || location.hash === "#/" ? BLUETEXT : GRAYTEXT}"
			>홈</a
		  >
		</li>
	  
		</li>
		<li>
		  <a href="/login" class=${GRAYTEXT}>로그인</a>
		</li>
	  </ul>
	</nav>`;
  return /*html*/ `
	<header class="bg-blue-600 text-white p-4 sticky top-0">
	  <h1 class="text-2xl font-bold">항해플러스</h1>
	</header>
	${nav}
  `;
};
