import { Observer } from "@lib/patterns/observer";
import UserService from "@lib/services/user";
import { mockPosts } from "@/__mocks__/posts";

/**
 * 포스트 정보를 관리하는 서비스
 * @description 포스트 목록을 로컬 스토리지에 저장하고 상태 변경 알림
 */
class PostService extends Observer {
  constructor() {
    super();

    if (PostService.instance) return PostService.instance;
    PostService.instance = this;

    this.init();
  }

  init() {
    this.posts = [];
    this.loadPosts();
  }

  loadPosts() {
    const postsStr = localStorage.getItem("posts");
    this.posts = postsStr ? JSON.parse(postsStr) : [...mockPosts];
  }

  savePosts() {
    localStorage.setItem("posts", JSON.stringify(this.posts));
    this.notify(this.posts);
  }

  getPosts() {
    return [...this.posts];
  }

  addPost(content) {
    const user = UserService.user;
    const newPost = {
      id: Date.now(),
      author: user.username,
      profileImage: "https://placehold.co/40",
      timeAgo: "방금 전",
      content: content,
    };

    this.posts.unshift(newPost);
    this.savePosts();
    return newPost;
  }

  deletePost(id) {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
      this.savePosts();
      return true;
    }
    return false;
  }
}

export default new PostService();
