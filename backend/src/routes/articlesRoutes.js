import { Router } from "express";
import {
  addArticle,
  fetchArticleById,
  fetchArticles,
} from "../controllers/articlesController.js";
import { handleMulterErrors } from "../middleware/multerMiddleware.js";

const articleRouter = Router();

articleRouter.get("/", fetchArticles);
articleRouter.get("/:id", fetchArticleById);

articleRouter.post("/", handleMulterErrors, addArticle);

export default articleRouter;
