export function login(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function logout() {
  localStorage.removeItem("user");
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function updateProfile(data) {
  localStorage.setItem("user", JSON.stringify(data));
}
