import React, { useState, useEffect, useMemo } from "react";
// import PagesLayout from "../layouts/PagesLayout";
import { useNavigate } from "react-router";
import {
  FiGrid,
  FiBook,
  FiSettings,
  FiHelpCircle,
  FiPlusCircle,
} from "react-icons/fi";
import pagesunbound from "../assets/images/pagesunbound.png";
import { FaCross, FaMap, FaRegHeart, FaRocketchat } from "react-icons/fa";
import { FaFaceGrin, FaSkull } from "react-icons/fa6";

const API_BASE_URL =
  "https://library-system-api-o8rl.onrender.com/api/v1/books"; // Define the API base URL

const Landing = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookData, setBookData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    recommendations: true,
    categories: true,
  });
  const [error, setError] = useState({
    recommendations: null,
    categories: null,
  });

  useEffect(() => {
    fetchRecommendations(); // Fetch recommendations on initial load
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(API_BASE_URL); // Fetching recommendations from the base URL
      const result = await response.json();
      setBookData(result.books);
      setRecommendations(result.books?.slice(0, 4) || []);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError((prev) => ({ ...prev, recommendations: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, recommendations: false }));
    }
  };

  const handleGenreClick = (genreName) => {
    setSelectedGenre(genreName);
    // Update recommendations based on selected genre
    if (genreName === "All") {
      setRecommendations(bookData.slice(0, 4)); // Major recommendations if 'All' is selected
    } else {
      const filteredBooks = bookData.filter((book) => book.genre === genreName);
      setRecommendations(filteredBooks);
    }
  };

  const genres = useMemo(() => {
    return ["All", ...new Set(bookData.map((book) => book.genre))];
  }, [bookData]);

  const handleBooks = () => {
    navigate("/books");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleAddBook = () => {
    navigate("/books");
  };


  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
        <div className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen overflow-y-auto">
          <div className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <img
                  src={pagesunbound}
                  alt="Pages Unbound"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-lg font-semibold">My Profile</span>
              </div>

              <div
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={handleBooks}
              >
                <FiBook className="text-gray-500" />
                <span className="text-gray-700">My Library</span>
              </div>

              <div
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={handleHome}
              >
                <FiGrid className="text-gray-500" />
                <span className="text-gray-700">Home</span>
              </div>

              <div
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={handleAddBook}
              >
                <FiPlusCircle className="text-gray-500" />
                <span className="text-gray-700">Add Book</span>
              </div>

              <div className="mt-24 space-y-6">
                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiSettings className="text-gray-500" />
                  <span className="text-gray-700">Settings</span>
                </div>

                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiHelpCircle className="text-gray-500" />
                  <span className="text-gray-700">Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="mb-8">
          {/* Your Hero Section content goes here */}
          {/* Example: */}
          <div class="bg-gray-50">
            <div class="min-h-screen flex flex-col">
              <div class="flex-1 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-full opacity-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 800 800"
                    class="w-full h-full"
                  >
                    <rect width="800" height="800" fill="none" />
                    <g>
                      <path
                        d="M769.6,179.4c-11.1-5.6-24.3-2-30.8,7.9l-17.9,27.1l-17.9-27.1c-6.5-9.8-19.7-13.5-30.8-7.9
            c-11.1,5.6-15.2,19.1-8.7,28.9l36.6,55.5l-172,261.2l-172-261.2l36.6-55.5c6.5-9.8,2.5-23.3-8.7-28.9
            c-11.1-5.6-24.3-2-30.8,7.9L335.2,214l-17.9-27.1c-6.5-9.8-19.7-13.5-30.8-7.9c-11.1,5.6-15.2,19.1-8.7,28.9l36.6,55.5
            l-172,261.2l-172-261.2l36.6-55.5c6.5-9.8,2.5-23.3-8.7-28.9c-11.1-5.6-24.3-2-30.8,7.9L-50.3,214l-17.9-27.1
            c-6.5-9.8-19.7-13.5-30.8-7.9c-11.1,5.6-15.2,19.1-8.7,28.9l36.6,55.5l-172,261.2l-172-261.2l36.6-55.5
            c6.5-9.8,2.5-23.3-8.7-28.9c-11.1-5.6-24.3-2-30.8,7.9l-17.9,27.1l-17.9-27.1c-6.5-9.8-19.7-13.5-30.8-7.9
            c-11.1,5.6-15.2,19.1-8.7,28.9l36.6,55.5l-172,261.2l-172-261.2l36.6-55.5c6.5-9.8,2.5-23.3-8.7-28.9
            c-11.1-5.6-24.3-2-30.8,7.9l-17.9,27.1l-17.9-27.1c-6.5-9.8-19.7-13.5-30.8-7.9c-11.1,5.6-15.2,19.1-8.7,28.9l36.6,55.5
            l214.8,326.2h35.8L-400,389.1l210.9,320.1h35.8L-400,389.1l210.9,320.1h35.8L-400,389.1l210.9,320.1h35.8L-400,389.1
            l210.9,320.1h35.8L-400,389.1l210.9,320.1h35.8L-400,389.1"
                        fill="#ffffff"
                      />
                    </g>
                  </svg>
                </div>

                <div class="container mx-auto px-6 py-24 relative z-10">
                  <div class="flex flex-col items-center justify-center text-white text-center">
                    <div class="w-44 h-44 mb-10 flex items-center justify-center bg-white bg-opacity-10 rounded-full p-8 backdrop-filter backdrop-blur-sm border border-white border-opacity-20">
                      <img
                        src={pagesunbound}
                        alt="Library Logo"
                        class="max-w-full max-h-full"
                      />
                    </div>

                    <h1 class="playfair text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
                      <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                        A utopia for book lovers
                      </span>
                    </h1>

                    <p class="text-lg md:text-xl max-w-2xl mx-auto text-purple-100 mb-12">
                      Discover thousands of books, join reading challenges, and
                      connect with fellow bibliophiles in our community.
                    </p>
                  </div>
                </div>

                <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    class="w-full h-12 md:h-16"
                  >
                    <path
                      d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                      fill="#F9FAFB"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Book Recommendations */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Book Recommendations
              </h2>
            </div>

            {loading.recommendations ? (
              <div className="text-center py-8">Loading recommendations...</div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendations.map((book) => (
                  <div
                    key={book.id || book._id}
                    className="bg-white rounded-md overflow-hidden shadow-sm"
                  >
                    <img
                      src={`https://savefiles.org/${book.image}?shareable_link=636`}
                      alt={`${book.title} cover`}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 relative overflow-hidden shadow-lg rounded-lg cursor-pointer"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-100 rounded-lg">
                No recommendations available
              </div>
            )}

            {error.recommendations && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg mt-2">
                {error.recommendations}
              </div>
            )}
          </div>
          {/* Book Categories */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Genres</h2>
              <button className="p-2 rounded-lg border border-gray-300">
                <FiGrid className="text-gray-600" />
              </button>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800"></h2>
                <button className="p-2 rounded-lg border border-gray-300"></button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Horror */}
                <div className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-full h-24 mb-4 flex items-center justify-center bg-gray-200 rounded">
                    <FaSkull className="text-4xl text-gray-600" />
                  </div>
                  <p className="text-xs font-medium text-center">Horror</p>
                </div>

                {/* Romance */}
                <div className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-full h-24 mb-4 flex items-center justify-center bg-red-200 rounded">
                    <FaRegHeart className="text-4xl text-red-500" />
                  </div>
                  <p className="text-xs font-medium text-center">Romance</p>
                </div>

                {/* Children's Books */}
                <div className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-full h-24 mb-4 flex items-center justify-center bg-blue-200 rounded">
                    <FaFaceGrin className="text-4xl text-blue-400" />
                  </div>
                  <p className="text-xs font-medium text-center">
                    Children's Books
                  </p>
                </div>

                {/* Adventure */}
                <div className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-full h-24 mb-4 flex items-center justify-center bg-green-200 rounded">
                    <FaMap className="text-4xl text-green-500" />
                  </div>
                  <p className="text-xs font-medium text-center">Adventure</p>
                </div>

                {/* Religious Books */}
                <div className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-full h-24 mb-4 flex items-center justify-center bg-yellow-200 rounded">
                    <FaCross className="text-4xl text-yellow-600" />
                  </div>
                  <p className="text-xs font-medium text-center">
                    Religious Books
                  </p>
                </div>

                {/* Science Fiction */}
                <div className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-full h-24 mb-4 flex items-center justify-center bg-purple-200 rounded">
                    <FaRocketchat className="text-4xl text-purple-500" />
                  </div>
                  <p className="text-xs font-medium text-center">
                    Science Fiction
                  </p>
                </div>
              </div>
            </div>

            {loading.genres ? (
              <div className="text-center py-8">Loading genres...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {genres.map((genre) => (
                  <div
                    key={genre} // Use genre directly as the key for uniqueness
                    className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleGenreClick(genre)}
                  >
                    <div className="w-full h-24 mb-4 flex items-center justify-center bg-gray-200 rounded">
                      {genre.image ? (
                        <img
                          src={genre.image}
                          alt={genre.name}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.target.src = "";
                            e.target.parentElement.innerHTML =
                              '<div class="flex items-center justify-center w-full h-full"><svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div>';
                          }}
                        />
                      ) : (
                        <FiBook className="text-4xl text-gray-400" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-center">
                      {genre.name}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {error.genres && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg mt-2">
                {error.genres}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
