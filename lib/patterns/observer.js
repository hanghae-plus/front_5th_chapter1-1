/**
 * Observable 패턴 구현
 * 기본적인 구독과 알림 기능만 제공
 */
export class Observer {
  constructor() {
    this._listeners = [];
  }

  /**
   * 상태 변경 리스너 등록
   * @param {Function} listener - 상태 변경 시 호출될 콜백 함수
   * @returns {Function} - 구독 취소 함수
   */
  subscribe(listener) {
    this._listeners.push(listener);
    return () => this.unsubscribe(listener);
  }

  /**
   * 등록된 리스너 제거
   * @param {Function} listener - 제거할 리스너 함수
   */
  unsubscribe(listener) {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }

  /**
   * 모든 리스너에게 상태 변경 알림
   * @param {any} data - 전달할 데이터
   */
  notify(data) {
    this._listeners.forEach((listener) => listener(data));
  }
}
