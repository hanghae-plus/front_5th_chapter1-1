const Footer = () => {
  const render = () => /* html */ `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;

  return {
    render,
    onRendered: null,
  };
};

export default Footer;
