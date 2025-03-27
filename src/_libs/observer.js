/** 옵저버 */
const observer = {
  /** @type {Set<Function>} 상태 변경을 구독하는 함수들 */
  subscribers: new Set(),

  /**
   * 상태 변경 구독하기
   * @param {Function} callback 상태 변경 시 호출될 함수
   */
  subscribe(callback) {
    this.subscribers.add(callback);
  },

  /** 상태 변경 알림 */
  notify() {
    this.subscribers.forEach((callback) => callback());
  },
};

export default observer;
