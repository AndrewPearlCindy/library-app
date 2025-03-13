import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaEdit, FaTrash } from "react-icons/fa";

const BookDetailPage = () => {
  const book = {
    title: "Thinking about water",
    author: "Niraj Bhattarai",
    rating: 4.2,
    availableCopies: 6,
    synopsis:
      "Synopsis\n\nExamine a Resource | River Calling | Poem\n\nDuring the 1980s and 90s, the Resource Institute, headed by Jonathan White, held a series of 'Floating Seminars' aboard a sixty-five-foot schooner featuring leading writers...",
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-xl my-8 border border-gray-100">
      {/* Book Header with Gradient Background */}
      <div className="relative">
        <div className="h-72 bg-gradient-to-br from-blue-400 to-purple-500">
          <div className="absolute inset-0 bg-grey-300 bg-opacity-20"></div>
          
          {/* Floating Book Cover */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <img
                src="/api/placeholder/160/240"
                alt="Book cover for Thinking about water"
                className="h-56 rounded shadow-2xl transform transition-all duration-300 hover:scale-105"
              />
              {/* Book Rating Badge */}
              <div className="absolute -right-4 -bottom-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                <div className="flex items-center text-sm">{renderStars(book.rating)}</div>
                <span className="font-bold text-gray-700">{book.rating}</span>
              </div>
            </div>
          </div>
          
          {/* Book Title Overlay - Positioned at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="text-sm opacity-90">By {book.author}</p>
          </div>
        </div>

        {/* Book Details Section */}
        <div className="p-6 bg-white">
          {/* Availability Badge */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-medium bg-green-100 text-green-800 py-1 px-3 rounded-full">
              {book.availableCopies} {book.availableCopies === 1 ? 'Copy' : 'Copies'} Available
            </span>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="w-10 h-10 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors duration-200">
                <FaEdit className="text-lg" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors duration-200">
                <FaTrash className="text-lg" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-full transition-colors duration-200">
                <FaHeart className="text-lg" />
              </button>
            </div>
          </div>

          {/* Synopsis Section */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-lg border-b border-gray-200 pb-2">Synopsis</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                During the 1980s and 90s, the Resource Institute, headed by
                Jonathan White, held a series of 'Floating Seminars' aboard a
                sixty-five-foot schooner featuring leading writers...
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 mt-2">
            Borrow This Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;