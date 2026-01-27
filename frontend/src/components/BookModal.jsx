import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const BookModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in both Title and Author before submitting.",
      });
      return;
    }

    if (!selectedFile) {
      Swal.fire({
        icon: "error",
        title: "No Cover Selected",
        text: "Please select a cover image for the book.",
      });
      return;
    }

    const maxSizeMB = 2;
    const fileSizeMB = selectedFile.size / (1024 * 1024);

    if (fileSizeMB > maxSizeMB) {
      Swal.fire({
        icon: "warning",
        title: "Image Too Large",
        text: `Cover image size should be less than ${maxSizeMB} MB.`,
      });
      return;
    }

    const data = new FormData();
    data.append("image", selectedFile);
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("publisher", formData.publisher);
    data.append("publishedDate", formData.publishedDate);

    onAdd(data);

    setFormData({ title: "", author: "", publisher: "", publishedDate: "" });
    setSelectedFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-2 md:p-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Add New Book
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="md:p-4 md:px-6 px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col">
              <div className="aspect-3/4 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Book cover preview"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center px-4 py-8">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-xs text-gray-500 font-medium">
                      Upload Cover
                    </p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                3:4 aspect ratio recommended
              </p>
            </div>

            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-1">
                  Book Cover
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:font-medium hover:file:bg-gray-200 transition cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-1">
                  Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                  onChange={handleInputChange}
                  value={formData.title}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                  onChange={handleInputChange}
                  value={formData.author}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    placeholder="Publisher name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                    onChange={handleInputChange}
                    value={formData.publisher}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-1">
                    Published Date
                  </label>
                  <input
                    type="date"
                    name="publishedDate"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition text-gray-700"
                    onChange={handleInputChange}
                    value={formData.publishedDate}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200 mb-1">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-gray-900 transition-colors active:scale-[0.98]"
                >
                  Add to Inventory
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
