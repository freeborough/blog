import express from "express";
import log from "../log.js";
import Post from "../Post.js";

const router = express.Router();

/**
 * GET /
 */
router.get("/", async (req, res) => {
  log.info("PostAPI GET /");
  res.json(await Post.getAll());
});

/**
 * GET /:id
 */
router.get("/:id", async (req, res) => {
  log.info("PostAPI GET /:id");
  res.json(await Post.getById(req.params.id));
});

/**
 * POST /
 */
router.post("/", async (req, res) => {
  log.info("PostAPI POST /");
  const post = {
    title: req.body.title,
    body: req.body.body,
    slug: req.body.slug,
  };

  await Post.create(post);
  res.sendStatus(204);
});

/**
 * PUT /:id
 */
router.put("/:id", async (req, res) => {
  log.info("PostAPI PUT /:id");
  const post = {
    id: req.params.id,
    title: req.body.title,
    body: req.body.body,
    slug: req.body.slug,
  };

  await Post.update(post);
  res.sendStatus(204);
});

/**
 * DELETE /:id
 */
router.delete("/:id", async (req, res) => {
  log.info("PostAPI DELETE /:id");
  await Post.delete(req.params.id);
  res.sendStatus(204);
});

export default router;