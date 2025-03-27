export const getCurrentPath = () => {
  const pathname = window.location.pathname;
  const hash = window.location.hash;

  if (hash.includes("#")) {
    return hash.slice(1);
  }

  return pathname;
};
