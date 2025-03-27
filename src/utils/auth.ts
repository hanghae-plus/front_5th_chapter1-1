import type { User } from "@/types/user";

export const login = (username: string) => {
  localStorage.setItem(
    "user",
    JSON.stringify({ username, email: "", bio: "" }),
  );
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUser = (): User | null => {
  const userValue = localStorage.getItem("user");
  let parsedUser = null;

  if (userValue) {
    parsedUser = JSON.parse(userValue);
  }
  return parsedUser;
};

export const updateUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};
