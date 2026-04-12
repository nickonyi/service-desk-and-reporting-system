import {
  createArticle,
  deleteArticleFromDb,
  getAllArtcicles,
  getArticleById,
  updateArticleFromDb,
} from "../db/query.js";
import { streamUpload } from "../utils/streamer.js";

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
        message: "article not found!",
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
        message: "Title, excerpt and content are required",
      });
    }

    let imageUrl = null;

    // If user uploaded an image, upload it to Cloudinary
    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      imageUrl = result.secure_url;
      console.log(imageUrl);
    }

    const newArticle = await createArticle(
      title,
      excerpt,
      content,
      author,
      imageUrl,
    );

    res.status(201).json({
      success: true,
      data: newArticle,
    });
  } catch (error) {
    console.log("Caught in controller");
    next(error);
  }
};

export const updateArticle = async (req, res) => {
  const { id, title, content, excerpt } = req.body;

  try {
    const updatedData = await updateArticleFromDb({
      title,
      content,
      excerpt,
      id,
    });
    res.json({ success: true, data: updatedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update article" });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteArticleFromDb({ id });
    res.json({ success: true, message: "Article deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete article" });
  }
};
