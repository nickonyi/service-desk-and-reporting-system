import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useArticles } from '../context/ArticlesContext';

function ArticleDetails() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { articles } = useArticles();

  const article = articles.find((a) => a.id === Number(articleId));

  if (!article) {
    return <p className="text-gray-400">Article not found</p>;
  }

  return (
    <div className="flex-1 space-y-6 bg-white min-h-screen">
      <div className="border-b p-2 pl-6 border-gray-200 flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Articles</h2>
        <div className="flex items-center gap-2"></div>
      </div>
      <div className="flex justify-between items-center mb-6 px-6">
        <h1 className="text-2xl font-semibold">{article.title}</h1>
      </div>

      <p className="text-gray-700 whitespace-pre-wrap px-6">{article.content}</p>
    </div>
  );
}

export default ArticleDetails;
