// TODO: 구조 변경하기(template, setup) 형식으로 간소화해볼까?

export function defineComponent(pageComponent) {
  const childrenTemplates = {};
  const childrenDomEvents = {};

  const hasChildren =
    Array.isArray(pageComponent.components) &&
    pageComponent.components.length > 0;

  if (hasChildren) {
    pageComponent.components.forEach((component) => {
      let instance;

      if (typeof component === "function") {
        instance = component();
      } else if (typeof component === "object" && component !== null) {
        instance = component;
      } else {
        console.warn("컴포넌트가 함수도 객체도 아닙니다.", component);
        return;
      }

      const key = instance.name || component.name;
      if (key) {
        childrenTemplates[key] = (props = {}) => instance.template(props);
        childrenDomEvents[key] = () => {
          if (typeof instance.domEvent === "function") {
            instance.domEvent();
          }
        };
      } else {
        console.warn("컴포넌트에 이름이 없습니다.", component);
      }
    });
  }

  return {
    name: pageComponent.name,
    template: (data = {}) => {
      return pageComponent.template({ ...data, children: childrenTemplates });
    },
    domEvent: () => {
      if (typeof pageComponent.domEvent === "function") {
        pageComponent.domEvent();
      }
      Object.values(childrenDomEvents).forEach((domEvent) => domEvent());
    },
  };
}
