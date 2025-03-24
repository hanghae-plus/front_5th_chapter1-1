// * Next.JS같이 혹은 React더라도 Server-Side Rendering을 할때는 window가 undefined이므로 Config 안에 location 같이 브라우저 전역 객체를 사용하는 것이 좋지 않다는 것을 알지만 이런 특수한 과제에서는 사용하는
export const config = {
  basePath: window.location.hostname.includes("github.io")
    ? "/front_5th_chapter1-1"
    : "/",
};
