import pg from "pg";

const db = new pg.Pool();

export default class Post {
  static async create(post) {
    const sql = "INSERT INTO post (title, body) VALUES ($1, $2);";
    const result = await db.query(sql, [ post.title, post.body ]);
  }

  static async getAll() {
    const sql = "SELECT * FROM post;";
    const result = await db.query(sql);
    return result.rows;
  }

  static async getById(id) {
    const sql = "SELECT * FROM post WHERE id = $1";
    const result = await db.query(sql, [ id ]);
    return result.rows[0];
  }
}
