import { useEffect, useState } from "react";
import type { Book } from "../types";
import { useNavigate } from "react-router-dom";

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, []);
  const fetchBook = async () => {
    try {
      const res = await fetch("http://localhost:4000/books");
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://locahost:4000/books/${id}`, { method: "DELETE" });
      fetchBook();
    } catch (error) {
      console.error("Error delecting books:", error);
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <b>
              {book.title} by {book.author} — ${book.price} ({book.stock} in
              stock)
            </b>
            <button onClick={() => navigate(`/edit/${book.id}`)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
