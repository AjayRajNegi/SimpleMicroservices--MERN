import { useState } from "react";
import type { Book } from "../types";
import BookSearch from "../components/BookSearch";

export default function SearchPage() {
  const [results, setResults] = useState<Book[]>([]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <BookSearch setResults={setResults} />
      {results.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3">Search Results</h2>
          <ul className="space-y-3">
            {results.map((book) => (
              <li
                key={book.id}
                className="bg-white rounded-lg shadow p-4 text-sm"
              >
                {book.title} by {book.author}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
