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

  const addArticle = async (articleData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
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

  return (
    <ArticleContext.Provider value={{ articles, addArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};
