const formListeners = (root, navigate, userStorage) => {
    root.addEventListener("submit", (e) => {
        if (e.target.id === "login-form") {
            e.preventDefault();
            const userValue = document.getElementById("username");
            const data = { username: userValue.value, email: "", bio: "" };
            userStorage.set(data);
            navigate("/");
            return;
        }

        if (e.target.id === "profile-form") {
            e.preventDefault();
            const userData = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                bio: document.getElementById("bio").value,
            };
            userStorage.set(userData);
            alert("프로필이 성공적으로 저장되었습니다.");
        }
    });
};

const inputListeners = (root, userStorage) => {
    root.addEventListener("input", (e) => {
        if (["username", "email", "bio"].includes(e.target.id)) {
            const tempData = {
                username: document.getElementById("username")?.value,
                email: document.getElementById("email")?.value,
                bio: document.getElementById("bio")?.value,
            };
            userStorage.setInput(tempData);
        }
    });
}

const clickListeners = (root, navigate, userStorage) => {
    root.addEventListener("click", (e) => {
        if (e.target.id === "logout") {
            e.preventDefault();
            userStorage.clear();
            navigate("/login");
            return;
        }

        if (e.target.id === "login") {
            e.preventDefault();
            navigate("/login");
            return;
        }

        const target = e.target.closest("a");
        if (target && target.getAttribute("href")?.startsWith("/")) {
            e.preventDefault();
            navigate(target.getAttribute("href"));
        }
    });
};


export { clickListeners, formListeners, inputListeners }