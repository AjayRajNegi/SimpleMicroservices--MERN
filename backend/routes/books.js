import express from "express";
import books from "../data/books.js";
import {
  validateBookCreation,
  validateBookUpdate,
} from "../middleware/validateBook.js";

const router = express.Router();

// GET all books (with optional ?author=)
router.get("/", (req, res) => {
  const { author } = req.query;
  if (author) {
    const filtered = books.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
    return res.status(200).json(filtered);
  }
  res.status(200).json(books);
});

// GET a single book
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.status(200).json(book);
});

// POST create a book
router.post("/", validateBookCreation, (req, res) => {
  const { title, author, price, stock } = req.body;
  if (!title || !author || price == null || stock == null) {
    return res.status(400).json({
      error: "Title, author, price, and stock are required",
    });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    price,
    stock,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update price/stock
router.put("/:id", validateBookUpdate, (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found!" });

  const { price, stock } = req.body;
  if (price == null && stock == null) {
    return res
      .status(400)
      .json({ error: "At least price or stock is required" });
  }

  if (price != null) book.price = price;
  if (stock != null) book.stock = stock;

  res.status(200).json(book);
});

// DELETE a book
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ error: "Book not found." });

  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted." });
});

export default router;
