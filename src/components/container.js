const Container = ({ children }) => {
  const container = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${children}
      </div>
    </div>
  `;
  return container;
};

export default Container;
