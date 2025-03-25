import hashRender from "./_actions/hashRender";
import states from "./_states";

states.routeType = "hash";

window.addEventListener("load", hashRender);
window.addEventListener("popstate", hashRender);
window.addEventListener("hashchange", hashRender);
