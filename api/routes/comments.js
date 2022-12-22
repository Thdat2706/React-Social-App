import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", [verifyToken, addComment]);
router.delete("/:id", [verifyToken, deleteComment]);

export default router;
