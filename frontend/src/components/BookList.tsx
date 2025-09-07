import { useEffect, useState } from "react";
import type { Book } from "../types";

interface BookListProps {
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export default function BookList({ onEdit, onDelete }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:4000/books");
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Book List</h2>
      <ul className="space-y-3">
        {books.map((book) => (
          <li
            key={book.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div className="text-sm">
              <b>
                {book.title} by {book.author}
              </b>
              <div className="text-gray-600">
                ${book.price} · {book.stock} in stock
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(book)}
                className="px-3 py-1.5 rounded-md text-sm bg-amber-500 text-white hover:bg-amber-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(book.id)}
                className="px-3 py-1.5 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
