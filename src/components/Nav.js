const Nav = () => {
  const currentPath = location.pathname; // pathname만 추출
  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${currentPath === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
        <li><a href="/profile" class="${currentPath === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
        <li><a href="#" class="text-gray-600">로그아웃</a></li>
      </ul>
    </nav>
  `;
};

export default Nav;
