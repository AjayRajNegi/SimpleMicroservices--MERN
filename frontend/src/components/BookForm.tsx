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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">
        {editingBook ? "Edit Book" : "Add Book"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!editingBook && (
          <>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                placeholder="The Pragmatic Programmer"
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Author</label>
              <input
                name="author"
                placeholder="Andy Hunt"
                value={form.author}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Price</label>
          <input
            name="price"
            placeholder="29.99"
            value={form.price}
            onChange={handleChange}
            className="h-10 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Stock</label>
          <input
            name="stock"
            placeholder="12"
            value={form.stock}
            onChange={handleChange}
            className="h-10 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingBook ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
