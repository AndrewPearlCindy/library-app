import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Landing from "./pages/Landing";
import Books from "./pages/Books";
import SingleBook from "./pages/SingleBook";
import AddBook from "./pages/AddBook";
// import NavBar from "./layouts/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/books" element={<Books />} />
        <Route path="/single-book" element={<SingleBook />} />
        <Route path="/add-book" element={<AddBook />} />
//           feature/add-book
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/" element={<NavBar />} />

        {/* <Route path="/navbar" element={<NavBar />} /> */
      </Routes>
    </BrowserRouter>
  );
}

export default App;
