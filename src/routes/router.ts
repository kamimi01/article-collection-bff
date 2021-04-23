import express from "express";
export const router = express.Router();
import { doGetArticles } from "../controllers/articleController";

router.get("/", doGetArticles);
