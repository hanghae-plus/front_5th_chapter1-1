const STORAGE_NAME = "user";

const state = {
    user: JSON.parse(localStorage.getItem(STORAGE_NAME) || "{}"),
    storage: {}, // 메모리 내 임시 저장소
};

const userStorage = {
    get() {
        return JSON.parse(localStorage.getItem(STORAGE_NAME) || "{}");
    },
    set(data) {
        localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
    },
    clear() {
        localStorage.removeItem(STORAGE_NAME);
        state.storage = {};
    },
    setInput(inputObj) {
        state.storage = inputObj;
    },
    getInput() {
        return state.storage;
    },
};

export default userStorage;
