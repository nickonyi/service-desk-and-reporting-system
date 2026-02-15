import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useArticles } from '../context/ArticlesContext';

export default function AddArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { addArticle } = useArticles();

  const handlePublish = () => {
    if (!title || !content) {
      return alert('fill all the fields!');
    }
    addArticle({
      title,
      excerpt: content.slice(0, 150) + '...',
      content,
      author: 'Admin',
    });
    navigate('/dashboard/knowledge');
  };
  return (
    <div className="min-h-screen bg-white text-gray-800 flex-2 ">
      <div className="border-b border-gray-200 p-2">
        <p className="text-normal font-semibold">Knowledge base</p>
      </div>
      <div className="mx-auto max-w-4xl px-6 py-8 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Add Knowledge Base Article</h1>
          <p className="text-sm text-gray-600">
            Create and publish a new article for your knowledge base.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 rounded-xl  p-6 ">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="e.g. How to reset a user password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-1 block text-sm font-medium">Content</label>
            <textarea
              rows={10}
              placeholder="Write your article content here..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                         focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 ">
            <button
              className="rounded-lg cursor-pointer border px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => navigate('knowledge')}
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="rounded-lg cursor-pointer bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
