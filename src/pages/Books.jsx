import React, { useState, useEffect } from "react";
import PagesLayout from "../layouts/PagesLayout";
import { useNavigate } from "react-router";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://library-system-api-o8rl.onrender.com/api/v1/books"
        );
        const data = await response.json();
        setBookData(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const SingleBook = () => {
    navigate("/single-book");
  };

  // Get unique genres for the filter
  const genres = ["All", ...new Set(bookData.map((book) => book.genre))];

  // Filter books based on selected genre
  const filteredBooks =
    selectedGenre === "All"
      ? bookData
      : bookData.filter((book) => book.genre === selectedGenre);

  return (
    <PagesLayout>
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10 ">
          <h1 className="text-3xl font-italic mb-4">Browse Books</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A curated collection of essential books for book lovers 😍.
          </p>
        </div>

        {/* Genre Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === genre
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full"
            >
              <div className="h-full overflow-hidden">
                <img
                  src={`https://savefiles.org/${book.image}?shareable_link=636`} // Use the correct image link
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 relative overflow-hidden shadow-lg rounded-lg cursor-pointer"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                    {book.genre}
                  </span>
                </div>
                <h2 className="text-lg font-bold mb-1">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3 flex-grow">
                  {book.description}
                </p>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 hover:bg-white transition w-full mt-auto rounded lg"
                  onClick={SingleBook}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {/* {filteredBooks.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No books found for this genre.</p>
          </div>
        )} */}
      </div>
    </PagesLayout>
  );
};

export default Books;
