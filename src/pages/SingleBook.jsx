import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaBookmark } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

const SingleBook = () => {
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch("http://localhost:4100/api/v1/books");
        const data = await response.json();

        // Assuming the first book is the main book and others are similar books
        if (data && data.length > 0) {
          setBook(data[0]);
          setSimilarBooks(data.slice(1, 5)); // Get up to 4 similar books
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  // Function to render star ratings
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!book) {
    return <div className="text-center p-4">Book not found</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      {/* Main book section */}
      <div className="relative">
        {/* Background image with overlay and gradient */}
        <div className="h-64 relative overflow-hidden">
          <img
            src={book.coverImage || "https://via.placeholder.com/400x600"}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-900/40"></div>
          <div className="absolute top-4 left-4 text-white">
            <h2 className="text-xl font-semibold">
              Thinking about {book.title}
            </h2>
            <p className="text-sm opacity-90">By {book.author}</p>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center text-white text-sm">
            <div className="flex mr-2">{renderRating(book.rating || 4.2)}</div>
            <span>
              {book.rating || 4.2} (by {book.reviews || 22}k users)
            </span>
          </div>
        </div>

        {/* Book cover overlay */}
        <div className="absolute left-6 bottom-0 transform translate-y-1/3">
          <div className="w-24 h-36 shadow-xl rounded-md overflow-hidden">
            <img
              src={book.coverImage || "https://via.placeholder.com/240x360"}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/20"></div>
            <div className="absolute bottom-0 w-full bg-blue-900 text-white text-center py-1 text-xs font-semibold">
              {book.title?.toUpperCase() || "WATER"}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-14 pb-4 px-4">
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-600">
            {book.copiesLeft || 6} Books left
          </div>
          <div className="flex space-x-2">
            <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
              Borrow Now
            </button>
            <button className="bg-white border border-gray-300 p-2 rounded-full">
              <BsFillInfoCircleFill className="text-blue-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Synopsis */}
      <div className="px-4 pb-4">
        <h3 className="font-semibold mb-2">Synopsis</h3>
        <p className="text-sm text-gray-700 line-clamp-3">
          {book.synopsis ||
            "During the 1980s and 90s, the Resource Institute, founded by legendary writer Ted a series of 'Thinking Forums' aboard a sixty-five-foot sailboat featuring leading thinkers..."}
        </p>
      </div>

      {/* Similar Books */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Similar Books</h3>
          <a href="#" className="text-sm text-blue-500">
            View All
          </a>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {similarBooks.map((similarBook, index) => (
            <div key={index} className="overflow-hidden rounded-md">
              <div className="relative h-32">
                <img
                  src={
                    similarBook.coverImage ||
                    `https://via.placeholder.com/150x200?text=${index + 1}`
                  }
                  alt={similarBook.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                {index === 0 && (
                  <div className="absolute bottom-0 w-full bg-yellow-400 text-xs text-center py-1">
                    Gold Zone
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute bottom-0 w-full bg-blue-400 text-xs text-center py-1">
                    Life Falls
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute bottom-0 w-full bg-teal-500 text-xs text-center py-1">
                    Ocean Man
                  </div>
                )}
                {index === 3 && (
                  <div className="absolute bottom-0 w-full bg-blue-300 text-xs text-center py-1">
                    Water
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
