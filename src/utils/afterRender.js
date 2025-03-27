export const afterRender = (callback) => {
  const form = document.querySelector('form');
  if (form) {
    callback(form);
  } else {
    requestAnimationFrame(() => {
      const form = document.querySelector('form');
      if (form) callback(form);
    });
  }
};
