import { useState } from "react";
import type { Book } from "../types";

interface BookSearchProps {
  setResults: (books: Book[]) => void;
}

export default function BookSearch({ setResults }: BookSearchProps) {
  const [author, setAuthor] = useState("");

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:4000/books?author=${author}`);
      const data: Book[] = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Search by Author</h2>
      <div className="flex items-center gap-2">
        <input
          value={author}
          placeholder="Author name"
          onChange={(e) => setAuthor(e.target.value)}
          className="h-10 flex-1 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  );
}
