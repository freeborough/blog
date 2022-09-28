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
    await Post.create({title: "Test One", slug: "test-one", body: "A small post."});
    await Post.create({title: "Another Test", slug: "another-test", body: "Morbi nulla neque, eleifend nec turpis ut, accumsan vestibulum erat. Aliquam erat volutpat. Suspendisse potenti. Curabitur et venenatis neque, nec dictum purus. Etiam et porttitor elit, sed tempus ante. Mauris porta, diam sit amet blandit aliquam, ligula dui auctor quam, sit amet volutpat nisl nibh eu purus. Donec vel mi pellentesque, porta tellus vel, elementum mi. Aenean sed justo ex. Ut sit amet odio est. Fusce leo massa, sagittis et nibh vel, aliquet fermentum elit. Aliquam efficitur lorem vitae felis convallis, vel placerat nunc lacinia. Donec turpis lectus, rhoncus sit amet vulputate at, feugiat et sem. Pellentesque venenatis dignissim augue, quis congue neque pellentesque sit amet. Aliquam vitae dui a nisi vestibulum convallis sit amet eleifend tortor."});
  }

  static async doAll() {
    await Migrate.down();
    await Migrate.up();
    await Migrate.seeds();
  }
}