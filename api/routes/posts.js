import express from 'express';
import PostsController from "../controllers/posts.js";

const router = express.Router();

router.get("/", PostsController.getPosts);
router.get("/:id", PostsController.getPost);
router.post("/", PostsController.createPost);
router.delete("/:id", PostsController.deletePost);
router.put("/:id", PostsController.updatePost);

export default router;