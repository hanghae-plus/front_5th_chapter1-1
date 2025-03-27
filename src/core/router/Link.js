import { addEvent } from "../../event";
import { navigate } from "./router";

const Link = ({ to, label, className = "" }) => {
  const eventKey = addEvent({
    tag: "a",
    type: "click",
    listener: (e) => {
      e.preventDefault();
      navigate(to);
    },
  });

  return `<a href="${to}" class="${className}" data-event="${eventKey}">${label}</a>`;
};

export default Link;
