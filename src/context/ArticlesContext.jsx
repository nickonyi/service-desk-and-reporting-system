import { createContext, useContext, useEffect, useState } from 'react';

const ArticleContext = createContext();

export const useArticles = () => {
  const context = useContext(ArticleContext);

  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState(() => {
    const stored = localStorage.getItem('articles');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  const addArticle = (articleData) => {
    const newArticle = {
      id: Date().now(),
      date: new Date().toISOString(),
      views: 0,
      ...articleData,
    };
    setArticles((prev) => [newArticle, ...prev]);
    return newArticle;
  };

  const incrementViews = (id) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, views: a.views + 1 } : a)));
  };

  return (
    <ArticleContext.Provider values={{ articles, addArticle, incrementViews }}>
      {children}
    </ArticleContext.Provider>
  );
};
