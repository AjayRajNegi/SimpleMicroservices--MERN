import { useState } from "react";
import type { Book } from "../types";
import BookSearch from "../components/BookSearch";

export default function SearchPage() {
  const [results, setResults] = useState<Book[]>([]);

  return (
    <div>
      <BookSearch setResults={setResults} />
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
