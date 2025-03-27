let _events = [];
let _rootElement = null;
let eventIndex = 0;

const isDuplication = ({ selector, type, listener }) => {
  return Boolean(
    _events.find(
      (event) =>
        event.selector === selector &&
        event.type === type &&
        event.listener === listener,
    ),
  );
};

const createEventKey = (tag) => {
  return `${tag}:${eventIndex++}`;
};

// 컴포넌트에서 이벤트 객체 등록하는 함수
const addEvent = (event) => {
  const eventKey = createEventKey(event.tag);

  if (isDuplication(event)) return;

  const _listener = (e) => {
    // 이벤트 타겟이 selector이거나 selector 자손이면 실행
    if (!e.target.closest(`[data-event="${eventKey}"]`)) return;

    event.listener(e);
  };
  _events.push({
    ...event,
    selector: eventKey,
    listener: _listener,
  });

  return eventKey;
};

// render에서 이벤트 등록하는 함수
const registerEvent = (rootElement) => {
  _rootElement = rootElement;
  _events.forEach(({ type, listener }) => {
    _rootElement.removeEventListener(type, listener);
    _rootElement.addEventListener(type, listener);
  });
};

// 이벤트 초기화하는 함수
const resetEvent = () => {
  if (!_rootElement) return;

  _events.forEach(({ type, listener }) => {
    _rootElement.removeEventListener(type, listener);
  });
  _events = [];
};

export { addEvent, registerEvent, resetEvent };
