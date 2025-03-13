import React, { useState, useEffect } from "react";
import PagesLayout from "../layouts/PagesLayout";
import { FiSearch, FiGrid, FiBook, FiDownload, FiStar, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";

// API service for all backend calls
const API_BASE_URL = "https://library-system-api-o8rl.onrender.com/api/v1";

const apiService = {
  // Get all books or search books by query
  getBooks: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add search parameters if they exist
    if (params.title) queryParams.append("title", params.title);
    if (params.author) queryParams.append("author", params.author);
    if (params.bookId) queryParams.append("id", params.bookId);
    if (params.category) queryParams.append("category", params.category);
    
    const url = `${API_BASE_URL}/book?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    
    return response.json();
  },
  
  // Get book recommendations
  getRecommendations: async (limit = 4) => {
    // Endpoint for recommendations could be different
    const url = `${API_BASE_URL}/book/recommendations?limit=${limit}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Fallback to regular books endpoint if recommendations endpoint doesn't exist
        return apiService.getBooks({ limit });
      }
      return response.json();
    } catch (error) {
      // Fallback to regular books endpoint
      return apiService.getBooks({ limit });
    }
  },
  
  // Get categories
  getCategories: async () => {
    const url = `${API_BASE_URL}/categories`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Return mock categories as fallback
      return {
        success: true,
        data: [
          { id: 1, name: "Money/Investing", image: "/images/money.jpg" },
          { id: 2, name: "Design", image: "/images/design.jpg" },
          { id: 3, name: "Business", image: "/images/business.jpg" },
          { id: 4, name: "Self Improvement", image: "/images/self-improvement.jpg" },
        ]
      };
    }
  },
  
  // Get book by ID
  getBookById: async (id) => {
    const url = `${API_BASE_URL}/book/${id}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    
    return response.json();
  }
};

const Landing = () => {
  const [books, setBooks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    books: false,
    recommendations: false,
    categories: false
  });
  const [error, setError] = useState({
    books: null,
    recommendations: null,
    categories: null
  });
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title"); // Options: title, author, id
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Initialize data on page load
  useEffect(() => {
    fetchRecommendations();
    fetchCategories();
  }, []);

  // Fetch book recommendations
  const fetchRecommendations = async () => {
    setLoading(prev => ({ ...prev, recommendations: true }));
    try {
      const result = await apiService.getRecommendations();
      if (result && result.data) {
        setRecommendations(result.data);
      }
    } catch (err) {
      setError(prev => ({ ...prev, recommendations: err.message }));
      // Use sample data as fallback
      setRecommendations(sampleRecommendations);
    } finally {
      setLoading(prev => ({ ...prev, recommendations: false }));
    }
  };

  // Fetch book categories
  const fetchCategories = async () => {
    setLoading(prev => ({ ...prev, categories: true }));
    try {
      const result = await apiService.getCategories();
      if (result && result.data) {
        setCategories(result.data);
      }
    } catch (err) {
      setError(prev => ({ ...prev, categories: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  };

  // Handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, books: true }));
    
    try {
      const searchParams = {};
      
      // Set the appropriate search parameter based on searchBy
      if (searchQuery) {
        if (searchBy === "title") searchParams.title = searchQuery;
        else if (searchBy === "author") searchParams.author = searchQuery;
        else if (searchBy === "id") searchParams.bookId = searchQuery;
      }
      
      // Add category filter if not "All Categories"
      if (selectedCategory !== "All Categories") {
        searchParams.category = selectedCategory;
      }
      
      const result = await apiService.getBooks(searchParams);
      
      if (result && result.data) {
        setBooks(result.data);
      }
    } catch (err) {
      setError(prev => ({ ...prev, books: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, books: false }));
    }
  };

  // Sample recommendation data based on the image (fallback data)
  const sampleRecommendations = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "https://m.media-amazon.com/images/I/71TRUbzcvaL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 2,
      title: "Company of One",
      author: "Paul Jarvis",
      cover: "https://m.media-amazon.com/images/I/61H2SbqxEhL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 3,
      title: "How Innovation Works",
      author: "Matt Ridley",
      cover: "https://m.media-amazon.com/images/I/71+mC5a-J9L._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 4,
      title: "The Picture of Dorian Gray",
      author: "Oscar Wilde",
      cover: "https://m.media-amazon.com/images/I/71SJzxL9N-L._AC_UF1000,1000_QL80_.jpg"
    }
  ];

  return (
    <PagesLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <span className="text-lg font-semibold">Discover</span>
              </div>
              
              <nav className="space-y-6">
                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiGrid className="text-gray-500" />
                  <span className="text-gray-700">Category</span>
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
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                <div className="md:w-40">
                  <select 
                    className="w-full h-10 px-4 border border-gray-300 rounded-lg text-gray-600 bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option>All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Results</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-md overflow-hidden shadow-sm">
                      <img 
                        src={book.cover || "/images/placeholder-book.jpg"} 
                        alt={book.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-medium text-sm truncate">{book.title}</h3>
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
                <h2 className="text-xl font-semibold text-gray-800">Book Recommendation</h2>
                <a href="#" className="text-sm text-gray-600 flex items-center">
                  View all
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
              
              {loading.recommendations ? (
                <div className="text-center py-8">Loading recommendations...</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendations.map((book) => (
                    <div key={book.id} className="bg-white rounded-md overflow-hidden shadow-sm">
                      <img 
                        src={book.cover || "/images/placeholder-book.jpg"} 
                        alt={book.title} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
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
                <h2 className="text-xl font-semibold text-gray-800">Book Category</h2>
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
                    <p className="text-xs font-medium text-center uppercase">Book Library</p>
                  </div>
                  
                  {categories.map((category) => (
                    <div 
                      key={category.id} 
                      className="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setSearchQuery("");
                        handleSearch(new Event('submit'));
                      }}
                    >
                      <div className="w-full h-24 mb-4 flex items-center justify-center bg-gray-200 rounded">
                        {category.image ? (
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <FiBook className="text-4xl text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-center">{category.name}</p>
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