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
    <div>
      <h2>Search by Author</h2>
      <input
        value={author}
        placeholder="Author name"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
