import express from "express"
export const router = express.Router()
import ArticlesController from "../controllers/articleController"

const articlesCtl = new ArticlesController()
router.get("/", articlesCtl.doGetArticles)
