import { Router } from 'express';
import { addArticle, fetchArticleById, fetchArticles } from '../controllers/articlesController.js';

const articleRouter = Router();

articleRouter.get('/', fetchArticles);
articleRouter.get('/:id', fetchArticleById);

articleRouter.post('/', addArticle);

export default articleRouter;
