import { createArticle, getAllArtcicles, getArticleById } from '../db/query.js';

export const fetchArticles = async (req, res, next) => {
  try {
    const articles = await getAllArtcicles();
    res.json({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};

export const fetchArticleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await getArticleById(id);
    if (!article) {
      res.status(404).json({
        success: false,
        message: 'article not found!',
      });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const addArticle = async (req, res, next) => {
  try {
    const { title, excerpt, content, author } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, excerpt and content are required',
      });
    }
    const newArticle = await createArticle(title, excerpt, content, author);
    res.status(201).json({
      success: true,
      data: newArticle,
    });
  } catch (error) {
    next(error);
  }
};
