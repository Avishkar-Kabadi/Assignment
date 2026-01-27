import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BookModal from "./BookModal";
import BooksShimmerGrid from "./BooksShimmerGrid";

const Main = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);

      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Loading books...",
        didOpen: () => {
          Swal.showLoading();
        },
        showConfirmButton: false,
        allowOutsideClick: false,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: {
          popup: "swal-toast-dark"
        }
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/books`
      );

      setBooks(response.data);
      setIsModalOpen(false);

      Swal.close();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Books loaded successfully",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#2e7d32",
        customClass: {
          popup: "swal-toast-dark"
        }
      });

    } catch (error) {
      Swal.close();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to load books",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: {
          popup: "swal-toast-dark"
        }
      });

    } finally {
      setIsLoading(false);
    }
  };


  const handleAddBook = async (newBookData) => {
    try {
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Adding book...",
        didOpen: () => {
          Swal.showLoading();
        },
        showConfirmButton: false,
        allowOutsideClick: false,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: {
          popup: "swal-toast-dark"
        }
      });

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/book`,
        newBookData
      );

      Swal.close();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Book added successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#2e7d32",
        customClass: {
          popup: "swal-toast-dark"
        }
      });

      await fetchBooks();

    } catch (error) {
      Swal.close();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title:
          error?.response?.data?.message ||
          "Failed to add book",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#111111",
        iconColor: "#555555",
        customClass: {
          popup: "swal-toast-dark"
        }
      });
    }
  };


  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-3 tracking-tight">
                Inventory
              </h1>
              <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
                Manage your book collection with precision. Add, organize, and explore every title in your personal library.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-black text-white px-6 md:px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-900 transition-colors active:scale-[0.98] whitespace-nowrap"
            >
              <span className="text-xl">+</span>
              <span>Add Book</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">

        {isLoading && <BooksShimmerGrid />}
        {!isLoading && books.length > 0 && (
          <div className="mb-10 md:mb-14">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Collection Size
            </div>
            <div className="text-3xl md:text-4xl font-bold text-black mt-2">
              {books.length} {books.length === 1 ? 'Book' : 'Books'}
            </div>
          </div>
        )}

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {books.map((book) => (
              <Link
                key={book._id}
                to={`/book/${book._id}`}
                className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <h3 className="text-sm md:text-base font-semibold text-black line-clamp-2 mb-2 group-hover:text-gray-700 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-medium mb-4">
                    {book.author}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 truncate">
                      {book.publisher || 'Independent'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="py-16 md:py-24 text-center">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-5.002-4.5-10.747-10-10.747z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-black mb-2">
                No books yet
              </h3>
              <p className="text-gray-600 mb-6">
                Your inventory is empty. Add your first book to get started.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors active:scale-[0.98]"
              >
                <span className="text-lg">+</span>
                <span>Add Your First Book</span>
              </button>
            </div>
          )
        )}
      </main>

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddBook}
      />
    </div>
  );
};

export default Main;
