import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddBook = () => {
  const [buttonText, setButtonText] = useState("Add to Library");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // Show loading indicator
    setButtonText("Adding to Library");
    //Prevent default submit behaviour
    event.preventDefault();
    // Collect from inputs
    const formData = new FormData(event.target);
    console.log(formData);
    try {
      //Submit data to backend
      const response = await axios.post(
        "https://library-system-api-o8rl.onrender.com/api/v1/books",
        formData
      );
      console.log(response.data);
      //Hide loading indicator
      setButtonText("Added to Library");
      //Navigate to ourbooks
      navigate("/ourbooks");
    } catch (error) {
      alert("Failed to book to Library");
      setButtonText("Add to Library");
    }
  };

  return (
    <div>
      <div className="bg-[url(assets/images/lib2.jpg)] bg-cover flex justify-center items-center min-h-screen p-6">
        <div className="bg-white/80 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-400 to-indigo-600">
            <h2 className="text-center text-3xl font-bold text-white">
              Upload a Book
            </h2>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-bold text-black-700 mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-sm"
                  required
                  name="title"
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-bold text-black-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Enter author's name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-sm"
                  required
                  name="author"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-bold text-black-700 mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-sm"
                    required
                    name="genre"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-black-700 mb-2">
                    Year of Publication
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-sm"
                    min="1900"
                    max="2099"
                    placeholder="Enter Year"
                    required
                    name="publishedYear"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-bold text-black-700 mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-sm "
                    required
                    name="image"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-bold text-black-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 shadow-sm h-32 resize-none"
                  placeholder="Briefly describe the plot without spoilers..."
                  required
                  name="description"
                ></textarea>
                
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-black-700 mb-3">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-8 h-8 text-gray-500 cursor-pointer hover:text-yellow-400 transition duration-150"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
