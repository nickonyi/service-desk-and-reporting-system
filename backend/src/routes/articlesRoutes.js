import { Router } from "express";
import {
  addArticle,
  fetchArticleById,
  fetchArticles,
  updateArticle,
  deleteArticle,
} from "../controllers/articlesController.js";
import { handleMulterErrors } from "../middleware/multerMiddleware.js";

const articleRouter = Router();

articleRouter.get("/", fetchArticles);
articleRouter.get("/:id", fetchArticleById);

articleRouter.post("/", handleMulterErrors, addArticle);

// PUT /api/articles/:id
articleRouter.put("/:id", updateArticle);

// DELETE /api/articles/:id
articleRouter.delete("/:id", deleteArticle);
export default articleRouter;
