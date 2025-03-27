export const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    username: '',
    email: '',
    bio: '',
  };

  const container = document.createElement('div');
  container.className = 'bg-gray-100 min-h-screen flex justify-center';

  const inner = document.createElement('div');
  inner.className = 'max-w-md w-full';

  const main = document.createElement('main');
  main.className = 'p-4';
  main.innerHTML = `
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
        내 프로필
      </h2>
      <form id="profile-form">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
            사용자 이름
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value="${user.username}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value="${user.email}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">
            자기소개
          </label>
          <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user.bio}</textarea>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
          프로필 업데이트
        </button>
      </form>
    </div>
  `;

  const form = main.querySelector('#profile-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedUser = {
      username: main.querySelector('#username')?.value ?? '',
      email: main.querySelector('#email')?.value ?? '',
      bio: main.querySelector('#bio')?.value ?? '',
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('프로필이 업데이트되었습니다.');
  });

  inner.appendChild(main);
  container.appendChild(inner);

  return container;
};
