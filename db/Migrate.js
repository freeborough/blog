import fs from "fs";
import db from "../src/db.js";
import Post from "../src/Post.js";

export default class Migrate {
  static async up() {
    const sql = fs.readFileSync("./db/up.sql", "utf8");
    const result = await db.query(sql);
  }

  static async down() {
    const sql = fs.readFileSync("./db/down.sql", "utf8");
    const result = await db.query(sql);
  }

  static async seeds() {
    await Post.create({title: "Test One", slug: "test-one", body: "This is a test post."});
    await Post.create({title: "Another Test", slug: "another-test", body: "This is the dreaded follow-up post."});
  }

  static async doAll() {
    await Migrate.down();
    await Migrate.up();
    await Migrate.seeds();
  }
}