import type { User } from "@/types/user";

class UserStore {
  storedUser: null | User = null;

  constructor() {
    this.storedUser = null;
  }

  login(username: string) {
    const loggedUser = { username, email: "", bio: "" };
    localStorage.setItem("user", JSON.stringify(loggedUser));
    this.storedUser = loggedUser;
  }

  logout() {
    localStorage.removeItem("user");
  }

  get user(): User | null {
    const userValue = localStorage.getItem("user");
    let parsedUser = null;

    if (userValue) {
      parsedUser = JSON.parse(userValue);
    }

    this.storedUser = parsedUser;

    return parsedUser;
  }

  updateUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.storedUser = null;
  }
}

const userStore = new UserStore();

export default function useUserStore() {
  return userStore;
}
