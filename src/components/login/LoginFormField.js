const LoginFormField = (config) => {
  return `
    <div class="mb-4">
      <input id="${config.id}" type="${config.type}" placeholder="${config.placeholder}" class="w-full p-2 border rounded">
    </div>
  `;
};

export default LoginFormField;
