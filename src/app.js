import fs from "fs";
import express from "express";
import Handlebars from "handlebars";
import Post from "./Post.js";
import PostAPIRouter from "./post/PostAPIRouter.js";
import log from "./log.js";

const app = express();
export default app;
app.use(express.json());
app.use("/api/post", PostAPIRouter);
app.use(express.static("public"));

app.all("*", (req, res, next) => {
  log.info(JSON.stringify({ method: req.method, path: req.path, params: req.params, body: req.body }));
  next();
});

app.get("/", async (req, res) => {
  log.info("GET /");
  const posts = await Post.getAll();
  const template = Handlebars.compile(fs.readFileSync("./src/templates/index.hbs", "utf8"));
  res.status(200).send(template({ posts, APP_NAME: process.env.APP_NAME }));
});

app.get("/:slug", async (req, res) => {
  log.info("GET /:slug");
  const post = await Post.getBySlug(req.params.slug);
  const template = Handlebars.compile(fs.readFileSync("./src/templates/post.hbs", "utf8"));
  res.status(200).send(template({ post, APP_NAME: process.env.APP_NAME }));
});
