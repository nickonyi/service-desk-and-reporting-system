import { useState } from 'react';
import { Search, Plus, X, Calendar, User, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useArticles } from '../context/ArticlesContext';
import DashboardHeader from './DashboardHeader';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { articles } = useArticles();
  const navigate = useNavigate();

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const openArticle = (article) => {
    navigate(`/dashboard/knowledge/${article.id}`);
  };
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <DashboardHeader title="Knowledge base" btnText="Add article" />

        <div className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => openArticle(article)}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
