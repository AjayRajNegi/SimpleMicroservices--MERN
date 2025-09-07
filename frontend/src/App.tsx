import { useState } from "react";
import BookForm from "./components/BookForm";
import BookSearch from "./components/BookSearch";
import BookList from "./components/BookList";
import type { Book } from "./types";

function App() {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [results, setResults] = useState<Book[]>([]);

  const refresh = async () => {
    setEditingBook(null);
    setResults([]);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/books/${id}`, { method: "DELETE" });
      refresh();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="max-w-xs mx-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mt-[100px] mb-[20px]">
        BOOK STORE
      </h1>
      <BookForm editingBook={editingBook} />
      <br />
      <BookSearch setResults={setResults} />
      <br />
      <BookList
        onDelete={handleDelete}
        onEdit={(book) => setEditingBook(book)}
      />
      <br />
      {results.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {results.map((book) => (
              <li key={book.id}>
                {book.title} by {book.author}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
