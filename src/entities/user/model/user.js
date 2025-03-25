export class User {
  #username;
  #email;
  #bio;
  constructor({ username, email, bio }) {
    this.#username = username;
    this.#email = email;
    this.#bio = bio;
  }

  static build(user) {
    if (!user.username) return null;
    return new User({
      username: user.username,
      email: user.email ?? "",
      bio: user.bio ?? "",
    });
  }

  update(user) {
    this.#username = user.username ?? this.#username;
    this.#email = user.email ?? this.#email;
    this.#bio = user.bio ?? this.#bio;
  }

  toEntity() {
    return {
      username: this.#username,
      email: this.#email,
      bio: this.#bio,
    };
  }
}
