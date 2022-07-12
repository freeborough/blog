import db from "./db.js";

export default class Post {
  static async create(post) {
    const sql = "INSERT INTO post (title, body, slug) VALUES ($1, $2, $3);";
    const result = await db.query(sql, [ post.title, post.body, post.slug ]);
  }

  static async getAll() {
    const sql = "SELECT * FROM post;";
    const result = await db.query(sql);
    return result.rows;
  }

  static async getById(id) {
    const sql = "SELECT * FROM post WHERE id = $1;";
    const result = await db.query(sql, [ id ]);
    return result.rows[0];
  }

  static async getBySlug(slug) {
    const sql = "SELECT * FROM post WHERE slug = $1;";
    const result = await db.query(sql, [ slug ]);
    return result.rows[0];
  }

  static async update(post) {
    const sql = "UPDATE post SET title = $1, body = $2, slug = $3 WHERE id = $4;";
    const result = await db.query(sql, [ post.title, post.body, post.slug, post.id ]);
  }

  static async delete(id) {
    const sql = "DELETE FROM post WHERE id = $1;";
    const result = await db.query(sql, [ id ]);
  }
}
