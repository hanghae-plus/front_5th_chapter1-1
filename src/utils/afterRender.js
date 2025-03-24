export const afterRender = (callback) => {
  requestAnimationFrame(() => {
    const form = document.querySelector('form');
    if (form) callback(form);
  });
};
