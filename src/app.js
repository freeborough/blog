import express from "express";
import Post from "./Post.js";

Post.create({id: 1, title: "One", body: "First post!"});
Post.create({id: 2, title: "Second", body: "Two!"});

const port = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json(Post.getAll());
});

app.get("/:id", (req, res) => {
  res.json(Post.getById(req.params.id));
});

app.post("/", (req, res) => {
  const posts = Post.getAll();
  const post = {
    id: posts[posts.length - 1].id + 1,
    title: req.body.title,
    body: req.body.body,
  };

  Post.create(post);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
