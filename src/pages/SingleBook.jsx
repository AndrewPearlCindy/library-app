import React from "react";
import { FaDownload, FaEdit, FaTrash, FaHeart } from "react-icons/fa";
// import Landing from "./pages/Landing";
// import MyLibrary from './MyLibrary'; // Example: My Library component
// import GenresPage from './GenresPage'; // Example: Genres page component

const BookDetails = ({ book }) => {
  const apiUrl = "https://library-system-api-o8rl.onrender.com/api/v1/books";

  const handleSave = async () => {
    try {
      // Assuming you want to save the book details
      const response = await fetch(`${apiUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book), // Sending the book data
      });

      if (!response.ok) {
        throw new Error('Failed to save the book');
      }

      const result = await response.json();
      console.log("Book saved successfully:", result);
      // Provide feedback to the user if needed
    } catch (error) {
      console.error("Error saving the book:", error);
      alert("An error occurred while saving the book. Please try again.");
    }
  };

  // Check if book is defined and has an image property
  const imageUrl =
    book && book.image
      ? `https://savefiles.org/secure/uploads/${book.image}?shareable_link=636`
      : "/api/placeholder/240/360"; // Fallback image

  // Handle editing a book
  const handleEdit = async () => {
    const editedBook = {
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
      description: book.description,
    };

    try {
      const response = await fetch(`${apiUrl}/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedBook),
      });

      if (response.ok) {
        alert("Book updated successfully!");
      } else {
        alert("Failed to update book. Please try again.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book.");
    }
  };

  // Handle deleting a book
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`${apiUrl}/${book.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Book deleted successfully!");
          // Optionally handle UI updates, e.g., redirect or remove the book from the displayed list
        } else if (response.status === 404) {
          alert("Book not found. It may have already been deleted.");
        } else {
          alert("An error occurred while deleting the book. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("An error occurred while deleting the book.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl my-8 border border-gray-100">
      <div className="md:flex">
        {/* Book Image Section */}
        <div className="md:w-1/3 bg-gradient-to-br from-amber-50 to-amber-100">
          <div className="h-full flex items-center justify-center p-8">
            <div className="relative group">
              <img
                src={imageUrl} // Use the constructed image URL
                alt={book ? book.title : "Book Image"} // Provide alt text safely
                className="rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 w-full h-auto md:h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-xs font-medium">
                {book ? book.publishedYear : "N/A"}{" "}
                {/* Safe access to publishedYear */}
              </div>
            </div>
          </div>
        </div>

        {/* Book Details Section */}
        <div className="md:w-2/3 p-8 flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book ? book.title : "Title Not Available"}
            </h1>
            <div className="flex items-center text-gray-600 mb-6">
              <span className="text-sm mr-4">
                {book && book.author && book.author !== "NA"
                  ? `By ${book.author}`
                  : "Author Not Specified"}
              </span>
              <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                {book && book.genre ? book.genre : "Genre Not Specified"}
              </span>
            </div>
          </div>

          {/* Book description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              About this book
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {book && book.description
                ? book.description
                : "Description not available."}
            </p>
          </div>

          {/* Historical context */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              Historical Context
            </h2>
            <p className="text-gray-600 leading-relaxed">
              First published in{" "}
              {book && book.publishedYear
                ? book.publishedYear
                : "Year not available"}
              , this text has historical significance as one of the foundational
              works of the Latter Day Saint movement. It continues to be a
              central religious text for millions of followers worldwide.
            </p>
          </div>

          {/* Action buttons  */}
          <div className="mt-auto pt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors duration-200 mb-4 md:mb-0" // Added margin for mobile
              >
                <FaDownload /> Save
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={handleEdit}
                  className="w-10 h-10 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors duration-200"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={handleDelete}
                  className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors duration-200"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
