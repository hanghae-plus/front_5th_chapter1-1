import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getLoginStatus } from "../utils/getLoginStatus";

export default function ProfilePage() {
  const isLoggedIn = getLoginStatus();
  // TODO: 로그인 안됐을 때 예외 처리
  const storagedUser = localStorage.getItem("user"); //TODO: "" 는 falsy? 한 값이기 때문에 사용에 주의한다. // 잠시만요 이해할 시간을 좀 지금 뇌좀느려서요 // 빈문자열도 !가 잡는다... 이해가 안되는ㄴ데 이것도 자바스크립트 엔진이 ㅇ렇게 동작하기 때문인가요? 아하...!넵넵 우냐ㅕㅁ하게습다
  // 근데 storageUser 가 undefined 인 경우에는 (안해봐서 모르겠지만) === null 을 그냥 통과하나요? 만약에 나온다면 null 이 잡을 수 // 아하~!~!알겠스비다.
  if (storagedUser === null) return ""; // 문자열로 지금 리턴주고 있으니까 유저값없을경우 "" 해야함. // 그거는 취향차인가요? 아니면 기능적으로도 차이가 있을까여? 저는 무지성 ! 쓰긴하는데 아 == null 이요
  const { username, email, bio } = JSON.parse(storagedUser); //네네
  return /*HTML*/ `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${Header({ isLoggedIn })}
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
                    placeholder
                    value="${username}"
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
                    value="${email}"
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
                  >${bio}</textarea
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
          ${Footer()}
        </div>
      </div>
    </div>
  `;
}
