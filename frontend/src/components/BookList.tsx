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
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <b>
              {book.title} by {book.author} — ${book.price} ({book.stock} in
              stock)
            </b>
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
