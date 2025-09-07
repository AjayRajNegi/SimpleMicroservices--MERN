import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookListPage from "./pages/BookListPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <div className="max-w-xs mx-auto flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center mt-[100px] mb-[20px]">
          BOOK STORE
        </h1>

        <nav className="flex gap-4 mb-6">
          <Link to="/">Books</Link>
          <Link to="/add">Add</Link>
          <Link to="/search">Search</Link>
        </nav>

        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/edit/:id" element={<EditBookPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
