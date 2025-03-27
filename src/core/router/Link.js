const Link = ({ to, label, className = "" }) => {
  return `<a href="${to}" class="${className}">${label}</a>`;
};

export default Link;
