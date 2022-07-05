import dotenv from "dotenv";
dotenv.config();

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe("Post Router", function() {
  describe("GET /api/post/", function() {

    it("returns JSON", async function() {
      const res = await chai.request(app).get("/api/post/");
      expect(res).to.be.json;
    });

    it("returns an array", async function() {
      const res = await chai.request(app).get("/api/post/");
      expect(res.body).to.be.an("array");
    });

    it("returns the expected data", async function() {
      const res = await chai.request(app).get("/api/post/");
      expect(res.body[0].title).to.equal("Second");
    });
  });

  describe("POST /api/post/", function() {
    it("returns status 204 for valid post", async function() {
      const res = await chai.request(app).post("/api/post/")
        .send({ title: "Test Post", body: "My post from a test!" });
      
      expect(res).to.have.status(204);
    });
  });
});
