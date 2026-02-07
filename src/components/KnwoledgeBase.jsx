import React, { useState } from 'react';
import { Search, Plus, BookOpen, Calendar, User, Eye } from 'lucide-react';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data - replace with your actual data
  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'getting-started', name: 'Getting Started', count: 8 },
    { id: 'features', name: 'Features', count: 12 },
    { id: 'troubleshooting', name: 'Troubleshooting', count: 4 },
  ];

  const articles = [
    {
      id: 1,
      title: 'Getting Started with Your Application',
      excerpt: 'Learn the basics of setting up and using the application for the first time.',
      category: 'getting-started',
      author: 'John Doe',
      date: '2024-02-01',
      views: 1234,
    },
    {
      id: 2,
      title: 'Advanced Features Overview',
      excerpt: 'Explore advanced features and capabilities to maximize your productivity.',
      category: 'features',
      author: 'Jane Smith',
      date: '2024-02-05',
      views: 856,
    },
    {
      id: 3,
      title: 'Common Issues and Solutions',
      excerpt: 'Quick fixes for the most frequently encountered problems.',
      category: 'troubleshooting',
      author: 'Mike Johnson',
      date: '2024-02-03',
      views: 542,
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-6xl mx-auto ">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 p-2">
            <div className="flex items-center gap-3">
              <h1 className="text-md font-bold text-gray-900">Knowledge Base</h1>
            </div>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-1 rounded-lg transition-colors shadow-sm">
              <Plus className="w-5 h-5" />
              Add Article
            </button>
          </div>
          <p className="text-gray-600 px-6">Find answers and learn about our application</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 px-6">
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

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 px-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid p-6 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
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
                    <span>{article.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{article.views}</span>
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
  );
};

export default KnowledgeBase;
