import {
    getHashPath,
    getHistoryPath,
    hashNavigate,
    historyNavigate,
} from "./pathUtils";

const HashRouter = {
    getPath: getHashPath,
    navigate: hashNavigate,
    mode: "hash",
};

const HistoryRouter = {
    getPath: getHistoryPath,
    navigate: historyNavigate,
    mode: "history",
};

export { HashRouter, HistoryRouter }