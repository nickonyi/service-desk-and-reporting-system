import { createContext, useContext, useEffect, useState } from "react";

const ArticleContext = createContext();

export const useArticles = () => {
  const context = useContext(ArticleContext);

  if (!context) {
    throw new Error("useArticles must be used within ArticlesProvider");
  }
  return context;
};

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setError(null);
        setLoading(true);

        const res = await fetch(`${API_URL}/api/articles`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message || "Failed to fetch articles");
        }

        setArticles(json.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const addArticle = async (formData) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/articles`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Article was not added");
      }
      setArticles((prev) => [data.data, ...prev]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await fetch(`${API_URL}/api/articles/${id}`, { method: "DELETE" });
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const updateArticle = async (updatedArticle) => {
    try {
      const res = await fetch(`${API_URL}/api/articles/${updatedArticle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedArticle),
      });
      const saved = await res.json();
      console.log(saved);

      setArticles((prev) =>
        prev.map((article) =>
          article.id === saved.data.id ? saved.data : article,
        ),
      );
    } catch (err) {
      console.error("Failed to update article:", err);
    }
  };

  return (
    <ArticleContext.Provider
      value={{ articles, addArticle, loading, updateArticle, deleteArticle }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
