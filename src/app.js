import fs from "fs";
import express from "express";
import Handlebars from "handlebars";
import Post from "./Post.js";

const app = express();
export default app;
app.use(express.json());

app.get("/", async (req, res) => {
  const posts = await Post.getAll();
  const template = Handlebars.compile(fs.readFileSync("./src/templates/index.hbs", "utf8"));
  res.status(200).send(template({ posts, APP_NAME: process.env.APP_NAME }));
});

app.get("/:slug", async (req, res) => {
  const post = await Post.getBySlug(req.params.slug);
  const template = Handlebars.compile(fs.readFileSync("./src/templates/post.hbs", "utf8"));
  res.status(200).send(template({ post, APP_NAME: process.env.APP_NAME }));
});

app.get("/api/post/", async (req, res) => {
  res.json(await Post.getAll());
});

app.get("/api/post/:id", async (req, res) => {
  res.json(await Post.getById(req.params.id));
});

app.post("/api/post/", async (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body,
    slug: req.body.slug,
  };

  await Post.create(post);
  res.sendStatus(204);
});

app.put("/api/post/:id", async (req, res) => {
  const post = {
    id: req.params.id,
    title: req.body.title,
    body: req.body.body,
    slug: req.body.slug,
  };

  await Post.update(post);
  res.sendStatus(204);
});

app.delete("/api/post/:id", async (req, res) => {
  await Post.delete(req.params.id);
  res.sendStatus(204);
});


