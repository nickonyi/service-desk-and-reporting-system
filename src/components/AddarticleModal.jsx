import React, { useState } from 'react';
import {
  X,
  Save,
  Eye,
  Upload,
  Image,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  AlertCircle,
} from 'lucide-react';

const AddArticleModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    tags: '',
    coverImage: null,
    author: '',
    status: 'draft',
  });

  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'features', name: 'Features' },
    { id: 'troubleshooting', name: 'Troubleshooting' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'api', name: 'API Documentation' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverImage: file }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitting article:', formData);
      // Add your submission logic here
      onClose();
    }
  };

  const handleSaveDraft = () => {
    setFormData((prev) => ({ ...prev, status: 'draft' }));
    console.log('Saving draft:', formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Article</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a descriptive title..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category and Author Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief summary of the article (150-200 characters)"
                rows="3"
                maxLength="200"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.excerpt ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.excerpt ? (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.excerpt}
                  </p>
                ) : (
                  <span className="text-sm text-gray-500">
                    {formData.excerpt.length}/200 characters
                  </span>
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="coverImage" className="cursor-pointer">
                  <Image className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {formData.coverImage ? formData.coverImage.name : 'Click to upload cover image'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Content *</label>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Eye className="w-4 h-4" />
                  {previewMode ? 'Edit' : 'Preview'}
                </button>
              </div>

              {!previewMode ? (
                <>
                  {/* Toolbar */}
                  <div className="flex gap-2 p-2 bg-gray-50 border border-gray-300 rounded-t-lg">
                    <button type="button" className="p-2 hover:bg-gray-200 rounded" title="Bold">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded" title="Italic">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded" title="List">
                      <List className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded" title="Link">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Upload Image"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your article content here... (Supports markdown)"
                    rows="12"
                    className={`w-full px-4 py-3 border-x border-b rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm ${
                      errors.content ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </>
              ) : (
                <div className="border border-gray-300 rounded-lg p-6 min-h-[300px] bg-gray-50">
                  <div className="prose max-w-none">
                    {formData.content || (
                      <p className="text-gray-400 italic">No content to preview</p>
                    )}
                  </div>
                </div>
              )}
              {errors.content && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.content}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Separate tags with commas (e.g., tutorial, beginner, setup)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Help users find this article with relevant tags
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Save as Draft
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Publish Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage Example Component
const KnowledgeBaseWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Article
      </button>

      <AddArticleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default KnowledgeBaseWithModal;
