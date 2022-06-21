const posts = [];

export default class Post {
  static create(post) {
    posts.push(post);
  }

  static getAll() {
    return posts;
  }

  static getById(id) {
    return posts.find(post => post.id == id);
  }
}
