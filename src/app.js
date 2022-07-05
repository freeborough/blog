import express from "express";
import Post from "./Post.js";

const app = express();
export default app;
app.use(express.json());

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
  };

  await Post.create(post);
  res.sendStatus(204);
});

app.put("/api/post/:id", async (req, res) => {
  const post = {
    id: req.params.id,
    title: req.body.title,
    body: req.body.body,
  };

  await Post.update(post);
  res.sendStatus(204);
});

app.delete("/api/post/:id", async (req, res) => {
  await Post.delete(req.params.id);
  res.sendStatus(204);
});
