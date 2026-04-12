import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { useArticles } from "../context/ArticlesContext";

function ArticleDetails() {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const { articles, deleteArticle } = useArticles();

  const article = articles.find((a) => a.id === Number(articleId));

  if (!article) {
    return <p className="text-gray-400">Article not found</p>;
  }

  const handleDelete = () => {
    deleteArticle(article.id);
    navigate("/dashboard/knowledge");
  };

  const handleEdit = () => {
    navigate(`/dashboard/knowledge/articles/${article.id}/edit`);
  };

  return (
    <div className="flex-1 space-y-6 bg-white min-h-screen">
      <div className="border-b p-2 pl-6 border-gray-200 flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Articles</h2>
        <div className="flex items-center gap-2">
          <button
            className="bg-black text-white px-4 py-0.5 cursor-pointer rounded-lg flex items-center gap-1 transition-colors"
            onClick={handleEdit}
          >
            <Plus size={18} />
            Edit
          </button>
          <button
            className="bg-black text-white px-4 py-0.5 cursor-pointer rounded-lg flex items-center gap-1 transition-colors"
            onClick={handleDelete}
          >
            <Plus size={18} />
            Delete
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6 px-6">
        <h1 className="text-2xl font-semibold">{article.title}</h1>
      </div>

      <p className="text-gray-700 whitespace-pre-wrap px-6">
        {article.content}
      </p>
      <img className="pl-6 w-48" src={article.imageurl} alt="" />
    </div>
  );
}

export default ArticleDetails;
