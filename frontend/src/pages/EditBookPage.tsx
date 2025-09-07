import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Book } from "../types";
import BookForm from "../components/BookForm";

export default function EditBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) fetchBook(Number(id));
  }, [id]);

  const fetchBook = async (bookId: number) => {
    try {
      const res = await fetch(`http://localhost:4000/books/${bookId}`);
      const data: Book = await res.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <BookForm editingBook={book} />
    </div>
  );
}
