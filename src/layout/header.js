export const Header = (user) => `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" id="home" class="text-blue-600">홈</a></li>
        ${
          user
            ? `<li>
                  <a href="/profile" id="profile" class="text-gray-600">
                    프로필
                  </a>
              </li>`
            : ""
        }
      <li>
    ${
      user
        ? `<a href="/login" id="logout" class="text-gray-600">로그아웃</a>`
        : `<a href="/login" id="login" class="text-gray-600">로그인</a>`
    }
  </li>
      </ul>
    </nav>
`;
