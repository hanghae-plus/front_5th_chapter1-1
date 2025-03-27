import { styles } from "./style";

// 재사용 가능한 element 컴포넌트
export const element = {
  footer: () => {
    return `
            <footer class="bg-gray-200 p-4 text-center">
              <p>&copy; 2024 항해플러스. All rights reserved.</p>
            </footer>
    `;
  },
  header: (currentPath = '/') => {
    const user = localStorage.getItem('user');

    const isActive = (path) => {
      return currentPath === path ? styles.active : styles.inactive;
    };

    if (!user) {
      return `
              <header class="bg-blue-600 text-white p-4 sticky top-0">
                  <h1 class="text-2xl font-bold">항해플러스</h1>
              </header>
              <nav class="bg-white shadow-md p-2 sticky top-14">
                  <ul class="flex justify-around">
                      <li><a href="/" class="${isActive('/')}">홈</a></li>
                      <li><a href="/login" class="text-gray-600">로그인</a></li>
                  </ul>
              </nav>
      `;
    } else {
      return `
              <header class="bg-blue-600 text-white p-4 sticky top-0">
                  <h1 class="text-2xl font-bold">항해플러스</h1>
              </header>
              <nav class="bg-white shadow-md p-2 sticky top-14">
                  <ul class="flex justify-around">
                      <li><a href="/" class="${isActive('/')}">홈</a></li>
                      <li><a href="/profile" class="${isActive('/profile')}">프로필</a></li>
                      <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
                  </ul>
              </nav>
      `;
    }
  },
};
