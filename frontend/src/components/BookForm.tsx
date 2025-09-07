import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Book } from "../types";

interface BookFormProps {
  editingBook: Book | null;
}

interface FormState {
  title: string;
  author: string;
  price: string;
  stock: string;
}

export default function BookForm({ editingBook }: BookFormProps) {
  const [form, setForm] = useState<FormState>({
    title: "",
    author: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title,
        author: editingBook.author,
        price: String(editingBook.price),
        stock: String(editingBook.stock),
      });
    }
  }, [editingBook]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await fetch(`http://localhost:4000/books/${editingBook.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: Number(form.price),
            stock: Number(form.stock),
          }),
        });
      } else {
        await fetch("http://localhost:4000/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            author: form.author,
            price: Number(form.price),
            stock: Number(form.stock),
          }),
        });
      }

      setForm({ title: "", author: "", price: "", stock: "" });
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingBook ? "Edit Book" : "Add Book"}</h2>
      {!editingBook && (
        <>
          <input
            name="title"
            value={form.title}
            placeholder="Title"
            onChange={handleChange}
          />
          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
          />
        </>
      )}
      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
      />
      <button type="submit">{editingBook ? "Update" : "Add"}</button>
    </form>
  );
}
