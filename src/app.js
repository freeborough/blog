import "dotenv/config";
import express from "express";
import Post from "./Post.js";

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || "Blog Server";

const app = express();
app.use(express.json());

app.get("/api/post/", async (req, res) => {
  res.json(await Post.getAll());
});

app.get("/api/post/:id", async (req, res) => {
  res.json(await Post.getById(req.params.id));
});

app.post("/api/post/", async (req, res) => {
  console.log(`Post received: ${JSON.stringify(req.body)}`);
  const post = {
    title: req.body.title,
    body: req.body.body,
  };

  await Post.create(post);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`${appName} is listening on port ${port}`);
});
