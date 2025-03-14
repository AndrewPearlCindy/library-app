import React, { useState, useEffect } from "react";
import PagesLayout from "../layouts/PagesLayout";
import { Link, useNavigate } from "react-router";

import {
  FiGrid,
  FiBook,
  FiDownload,
  FiStar,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import pagesunbound from "../assets/images/pagesunbound.png";

const API_BASE_URL =
  "https://library-system-api-o8rl.onrender.com/api/v1/books";

const apiService = {
  getBooks: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}?${queryParams}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  getRecommendations: async (limit = 4) => {
    try {
      const url = `${API_BASE_URL}/recommendations?limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch recommendations: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      return { books: [] };
    }
  },

  getCategories: async () => {
    try {
      const url = `${API_BASE_URL}/categories`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      return { categories: [] };
    }
  },
};

const Landing = () => {
  const [books, setBooks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    books: false,
    recommendations: false,
    categories: false,
  });
  const [error, setError] = useState({
    books: null,
    recommendations: null,
    categories: null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    // Fetch data on mount
    fetchRecommendations();
    fetchCategories();
  }, []);

  const fetchRecommendations = async () => {
    setLoading((prev) => ({ ...prev, recommendations: true }));
    setError((prev) => ({ ...prev, recommendations: null }));
    try {
      const result = await apiService.getRecommendations();
      setRecommendations(result.books?.slice(0, 4) || []); // Take only 4 books, handle undefined
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError((prev) => ({ ...prev, recommendations: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, recommendations: false }));
    }
  };

  const fetchCategories = async () => {
    setLoading((prev) => ({ ...prev, categories: true }));
    setError((prev) => ({ ...prev, categories: null }));
    try {
      const result = await apiService.getCategories();
      setCategories(result.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError((prev) => ({ ...prev, categories: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault(); // Allow function to be called without an event

    setLoading((prev) => ({ ...prev, books: true }));
    setError((prev) => ({ ...prev, books: null }));

    try {
      const searchParams = {};
      if (searchQuery.trim()) searchParams[searchBy] = searchQuery.trim();
      if (selectedCategory !== "All Categories")
        searchParams.category = selectedCategory;

      const result = await apiService.getBooks(searchParams);
      setBooks(result.books || []);

      if ((result.books || []).length === 0) {
        setError((prev) => ({
          ...prev,
          books: "No books found matching your criteria",
        }));
      }
    } catch (err) {
      console.error("Error searching books:", err);
      setError((prev) => ({ ...prev, books: err.message }));
      setBooks([]);
    } finally {
      setLoading((prev) => ({ ...prev, books: false }));
    }
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchQuery("");

    // Use setTimeout to ensure state is updated before searching
    setTimeout(() => {
      handleSearch();
    }, 0);
  };

  

  return (
    <PagesLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex flex-1">
          <div className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <img
                  src={pagesunbound}
                  alt="Pages Unbound"
                  className="w-8 h-8 bg-orange-500 rounded-full"
                />
                <span className="text-lg font-semibold">Discover</span>
              </div>

              <nav className="space-y-6">
                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiGrid className="text-gray-500" />
                  <span className="text-gray-700">Category</span>
                  <Link to={"/"}>Home</Link>
                </div>

                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiBook className="text-gray-500" />
                  <span className="text-gray-700">My Library</span>
                </div>

                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiDownload className="text-gray-500" />
                  <span className="text-gray-700">Download</span>
                </div>

                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiStar className="text-gray-500" />
                  <span className="text-gray-700">Favorite</span>
                </div>
              </nav>

              <div className="mt-24 space-y-6">
                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiSettings className="text-gray-500" />
                  <span className="text-gray-700">Setting</span>
                </div>

                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiHelpCircle className="text-gray-500" />
                  <span className="text-gray-700">Help</span>
                </div>

                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiLogOut className="text-gray-500" />
                  <span className="text-gray-700">Log out</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 md:p-8 bg-gray-50">
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
              <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row gap-2"
              >
                <div className="md:w-40">
                  <select
                    className="w-full h-10 px-4 border border-gray-300 rounded-lg text-gray-600 bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All Categories">All Categories</option>
                    {Array.isArray(categories) && categories.length > 0 ? (
                      categories.map((category) => (
                        <option
                          key={category.id || category.name}
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Categories Available</option>
                    )}
                  </select>
                </div>

                <div className="flex-grow flex flex-col md:flex-row gap-2">
                  <div className="md:w-32">
                    <select
                      className="w-full h-10 px-4 border border-gray-300 rounded-lg text-gray-600 bg-white"
                      value={searchBy}
                      onChange={(e) => setSearchBy(e.target.value)}
                    >
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                      <option value="id">Book ID</option>
                    </select>
                  </div>

                  <div className="flex-grow">
                    <input
                      type="text"
                      className="w-full h-10 px-4 border border-gray-300 rounded-lg"
                      placeholder={`Search by ${searchBy}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-green-800 text-white h-10 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
                  disabled={loading.books}
                >
                  {loading.books ? "Searching..." : "Search"}
                </button>
              </form>
            </div>

            {/* Search Results (conditionally shown) */}
            {books.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Search Results
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {books.map((book) => (
                    <div
                      key={book.id || book._id}
                      className="bg-white rounded-md overflow-hidden shadow-sm"
                    >
                      <img
                        src={`https://savefiles.org/${book.image}?shareable_link=636`}
                        alt={`${book.title} cover`}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "/images/placeholder-book.jpg";
                        }}
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
              </div>
            )}

            {/* Error message for search */}
            {error.books && (
              <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-lg">
                {error.books}
              </div>
            )}

            {/* Book Recommendations */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Book Recommendation
                </h2>
                <a href="#" className="text-sm text-gray-600 flex items-center">
                  View all
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>

              {loading.recommendations ? (
                <div className="text-center py-8">
                  Loading recommendations...
                </div>
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
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "/images/placeholder-book.jpg";
                        }}
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
                <h2 className="text-xl font-semibold text-gray-800">
                  Book Category
                </h2>
                <button className="p-2 rounded-lg border border-gray-300">
                  <FiGrid className="text-gray-600" />
                </button>
              </div>

              {loading.categories ? (
                <div className="text-center py-8">Loading categories...</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-purple-200 rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                      <div className="w-4 h-4 bg-black rounded-full"></div>
                    </div>
                    <p className="text-xs font-medium text-center uppercase">
                      Book Library
                    </p>
                  </div>

                  {categories.map((category) => (
                    <div
                      key={category.id || category.name}
                      className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <div className="w-full h-24 mb-4 flex items-center justify-center bg-gray-200 rounded">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
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
                        {category.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {error.categories && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg mt-2">
                  {error.categories}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PagesLayout>
  );
};

export default Landing;
