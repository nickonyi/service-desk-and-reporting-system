import React, { useState } from 'react';

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('getting-started');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-3">
          <h1 className="text-md font-bold text-gray-900">Add Article</h1>
          <p className="text-sm text-gray-600">Create a new knowledge base article</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="e.g. Getting Started with Your Application"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Category + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="getting-started">Getting Started</option>
                <option value="features">Features</option>
                <option value="troubleshooting">Troubleshooting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              rows={3}
              placeholder="Short summary shown in the article list"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              rows={10}
              placeholder="Write the full article content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-100">
              Cancel
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-100">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
