import dotenv from "dotenv";
dotenv.config({ path: './.env.test' });

import chai from "chai";
import chaiHttp from "chai-http";
import chaiLike from "chai-like";
import app from "../src/app.js";
import Migrate from "../db/Migrate.js";
import Post from "../src/Post.js";

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiLike);

const seeds = [
  { title: "Test One", body: "This is a test post." },
  { title: "Another Test", body: "This is the dreaded follow-up post." },
];

const validPosts = [
  { title: "My Third Post", body: "One.. two.. THREE!" },
  { title: "Numero Quatro", body: "La scimmia è nell'albero." },
];

const invalidPosts = [
  {},
  { title: "My Third Post" },
  { body: "One.. two.. THREE!" },
];

describe("Post Router", function() {
  beforeEach(async function() {
    await Migrate.doAll();
  });

  /**
   * GET /api/post/
   */
  describe("GET /api/post/", function() {
    it("returns the expected data", async function() {
      const res = await chai.request(app).get("/api/post/");
      expect(res.body).to.be.like(seeds);
    });
  });

  /**
   * GET /api/post/:id
   */
  describe("GET /api/post/:id", function() {
    it("returns the specified post", async function() {
      const res = await chai.request(app).get("/api/post/1");
      expect(res.body).to.be.like(seeds[0]);
    });
  });

  /**
   * POST /api/post/
   */
  describe("POST /api/post/", function() {
    it("creates the record for a valid post", async function() {
      const res = await chai.request(app).post("/api/post/")
        .send(validPosts[0]);
      
      const expectedData = [...seeds];
      expectedData.push(validPosts[0]);

      const check = await Post.getAll();
      expect(check).to.be.like(expectedData);
    });
  });

  /**
   * PUT /api/post/:id
   */
  describe("PUT /api/post/:id", function() {
    it("updates the specified record for a valid post", async function() {
      const res = await chai.request(app).put("/api/post/1")
        .send(validPosts[0]);

      const expectedData = validPosts[0];
      expectedData.id = 1;

      const check = await Post.getById(1);
      expect(check).to.be.like(expectedData);
    });
  });

  /**
   * DELETE /api/post/:id
   */
  describe("DELETE /api/post/:id", function() {
    it("deletes the specified record", async function() {
      const res = await chai.request(app).delete("/api/post/1");

      const expectedData = seeds;
      expectedData.shift();

      const check = await Post.getAll();
      expect(check).to.be.like(expectedData);
    });
  });
});
