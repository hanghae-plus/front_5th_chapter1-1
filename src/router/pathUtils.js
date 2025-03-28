
const getHashPath = (basePath = "") => {
    let path = location.hash.replace(/^#/, "");

    if (basePath && path.startsWith(basePath)) {
        path = path.slice(basePath.length);
    }

    return path || "/";
};

const getHistoryPath = (basePath = "") => {
    const path = window.location.pathname;

    if (basePath && path.startsWith(basePath)) {
        return path.slice(basePath.length) || "/";
    }

    return path || "/";
};

const hashNavigate = (basePath, path) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    location.hash = `${basePath}#${normalizedPath}`;
};

const historyNavigate = (basePath, path) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const fullPath = basePath + normalizedPath;
    history.pushState(null, "", fullPath);
};

export { historyNavigate, getHistoryPath, hashNavigate, getHashPath }