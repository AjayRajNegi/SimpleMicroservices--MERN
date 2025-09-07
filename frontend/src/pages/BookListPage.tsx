import { useEffect, useState } from "react";
import type { Book } from "../types";
import { useNavigate } from "react-router-dom";

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const res = await fetch("http://localhost:4000/books");
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  useEffect(() => {
    fetchBook();
    console.log("fetch");
  }, []);

  const handleDelete = async (id: number) => {
    console.log(typeof id);
    try {
      const res = await fetch(`http://localhost:4000/books/${id}`, {
        method: "DELETE",
      });
      const data = res.json();
      console.log(data);
    } catch (error) {
      console.error("Error delecting books:", error);
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
                onClick={() => navigate(`/edit/${book.id}`)}
                className="px-3 py-1.5 rounded-md text-sm bg-amber-500 text-white hover:bg-amber-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
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
