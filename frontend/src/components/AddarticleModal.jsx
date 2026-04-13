import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useArticles } from "../context/ArticlesContext";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const { addArticle, updateArticle, articles, loading } = useArticles();

  const { articleId } = useParams();
  const isEditMode = Boolean(articleId);

  //  GET EXISTING ARTICLE
  const existingArticle = articles.find((a) => a.id === Number(articleId));

  //  PREFILL FORM WHEN EDITING
  useEffect(() => {
    if (isEditMode && existingArticle) {
      setTitle(existingArticle.title);
      setContent(existingArticle.content);
    }
  }, [isEditMode, existingArticle]);

  const handlePublish = async () => {
    if (!title || !content) {
      return alert("fill all the fields!");
    }

    // EDIT MODE
    if (isEditMode) {
      const formData = new FormData();

      formData.append("id", Number(articleId));
      formData.append("title", title);
      formData.append("content", content);
      formData.append("excerpt", content.slice(0, 150) + "...");
      formData.append("author", existingArticle?.author || "Admin");

      // 👇 THIS is the missing piece
      if (image) {
        formData.append("image", image);
      }

      await updateArticle(formData);
    } else {
      //  CREATE MODE
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", content.slice(0, 150) + "...");
      formData.append("content", content);
      formData.append("author", "Admin");

      if (image) {
        formData.append("image", image);
      }

      await addArticle(formData);
    }

    navigate("/dashboard/knowledge");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex-2 ">
      <div className="border-b border-gray-200 p-2">
        <p className="text-normal font-semibold">Knowledge base</p>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {isEditMode
              ? "Edit Knowledge Base Article"
              : "Add Knowledge Base Article"}
          </h1>
          <p className="text-sm text-gray-600">
            {isEditMode
              ? "Update your existing article."
              : "Create and publish a new article for your knowledge base."}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 rounded-xl p-6 ">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              type="text"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                         focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Image */}
          <div>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 ">
            <button
              className="rounded-lg cursor-pointer border px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => navigate("/dashboard/knowledge")}
            >
              Cancel
            </button>

            <button
              onClick={handlePublish}
              className="rounded-lg cursor-pointer bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Publishing..."
                : isEditMode
                  ? "Update"
                  : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
