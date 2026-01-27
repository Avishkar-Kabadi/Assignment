
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchBookDetails = async () => {
    try {
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Loading book details...",
        didOpen: () => Swal.showLoading(),
        showConfirmButton: false,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: { popup: "swal-toast-dark" }
      });

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/book/${id}`
      );

      setBook(res.data);
      setEditData({
        title: res.data.title || "",
        author: res.data.author || "",
        publisher: res.data.publisher || "",
        publishedDate: res.data.publishedDate
          ? res.data.publishedDate.slice(0, 10)
          : "",
      });

      Swal.close();
    } catch (error) {
      Swal.close();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Could not load book details",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: { popup: "swal-toast-dark" }
      });
    }
  };


  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This book will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Deleting book...",
        didOpen: () => Swal.showLoading(),
        showConfirmButton: false,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: { popup: "swal-toast-dark" }
      });

      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/book/${id}`
      );

      Swal.close();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Book deleted successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#2e7d32",
        customClass: { popup: "swal-toast-dark" }
      });

      navigate("/");
    } catch (error) {
      Swal.close();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Delete failed",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: { popup: "swal-toast-dark" }
      });
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleUpdate = async () => {
    if (!editData.title.trim() || !editData.author.trim()) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Title and Author are required",
        showConfirmButton: false,
        timer: 2500,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: { popup: "swal-toast-dark" }
      });
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("image", selectedFile);
    formData.append("title", editData.title);
    formData.append("author", editData.author);
    formData.append("publisher", editData.publisher);
    formData.append("publishedDate", editData.publishedDate);

    try {
      // 🔄 Loading toast
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Updating book...",
        didOpen: () => Swal.showLoading(),
        showConfirmButton: false,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: { popup: "swal-toast-dark" }
      });

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/book/${id}`,
        formData
      );

      Swal.close();

      // ✅ Success toast
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Book updated successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#2e7d32",
        customClass: { popup: "swal-toast-dark" }
      });

      setIsEditing(false);
      fetchBookDetails();
    } catch (error) {
      Swal.close();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title:
          error.response?.data?.message || "Update failed",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: { popup: "swal-toast-dark" }
      });
    }
  };


  if (!book)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium text-sm">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <header className="border-b fixed border-gray-200 px-6 md:px-8 py-4 flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors font-medium text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
      </header>

      <main className="flex-1 p-6 md:p-12 flex items-center  justify-center">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <div className="w-80 aspect-3/4 rounded-lg bg-gray-100 border border-gray-300 overflow-hidden flex items-center justify-center">
                <img
                  src={
                    selectedFile ? URL.createObjectURL(selectedFile) : book.image
                  }
                  alt={book.title}
                  className="w-full h-full object-cover  hover:scale-105 transition-transform duration-300"
                />
              </div>

              {isEditing && (
                <div className="mt-6 w-full">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
                    Change Cover
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-200 file:text-gray-700 file:font-medium hover:file:bg-gray-300 transition cursor-pointer"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
                        Title
                      </label>
                      <input
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="text-3xl font-bold w-full bg-gray-50 border-b-2 border-gray-300 focus:border-black outline-none pb-2 transition text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
                        Author
                      </label>
                      <input
                        value={editData.author}
                        onChange={(e) =>
                          setEditData({ ...editData, author: e.target.value })
                        }
                        className="text-lg w-full bg-gray-50 border-b-2 border-gray-300 focus:border-black outline-none pb-2 transition text-gray-700"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl md:text-4xl font-bold text-black">
                      {book.title}
                    </h1>
                    <p className="text-lg text-gray-600">by {book.author}</p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-200">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Publisher
                  </p>
                  {isEditing ? (
                    <input
                      value={editData.publisher}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          publisher: e.target.value,
                        })
                      }
                      className="text-base w-full bg-gray-50 border-b border-gray-300 focus:border-black outline-none pb-2 transition text-gray-900"
                      placeholder="Enter publisher"
                    />
                  ) : (
                    <p className="text-base font-medium text-gray-900">
                      {book.publisher || "—"}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Published Date
                  </p>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.publishedDate}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          publishedDate: e.target.value,
                        })
                      }
                      className="text-base w-full bg-gray-50 border-b border-gray-300 focus:border-black outline-none pb-2 transition text-gray-900"
                    />
                  ) : (
                    <p className="text-base font-medium text-gray-900">
                      {book.publishedDate || "—"}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors active:scale-[0.98]"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors active:scale-[0.98]"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors active:scale-[0.98]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 hover:text-red-600 transition-colors active:scale-[0.98]"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
