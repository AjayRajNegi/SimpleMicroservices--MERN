import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookListPage from "./pages/BookListPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white/70 backdrop-blur">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold tracking-wide">
              Book Store
            </Link>
            <nav className="flex gap-2">
              <Link
                to="/"
                className="px-3 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                Books
              </Link>
              <Link
                to="/add"
                className="px-3 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                Add
              </Link>
              <Link
                to="/search"
                className="px-3 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                Search
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<BookListPage />} />
            <Route path="/add" element={<AddBookPage />} />
            <Route path="/edit/:id" element={<EditBookPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
