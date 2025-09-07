import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import {
  validateBookCreation,
  validateBookUpdate,
} from "../middleware/validateBook.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET all books (with optional ?author=)
router.get("/", async (req, res) => {
  try {
    const { author } = req.query;
    const books = await prisma.book.findMany({
      where: author
        ? {
            author: {
              contains: author,
              mode: "insensitive", // case-insensitive
            },
          }
        : undefined,
    });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// GET a single book
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// POST create a book
router.post("/", validateBookCreation, async (req, res) => {
  try {
    const { title, author, price, stock } = req.body;

    if (!title || !author || price == null || stock == null) {
      return res.status(400).json({
        error: "Title, author, price, and stock are required",
      });
    }

    const newBook = await prisma.book.create({
      data: { title, author, price: Number(price), stock: Number(stock) },
    });

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// PUT update price/stock
router.put("/:id", validateBookUpdate, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { price, stock } = req.body;

    if (price == null && stock == null) {
      return res
        .status(400)
        .json({ error: "At least price or stock is required" });
    }

    // Check if book exists
    const existing = await prisma.book.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Book not found!" });
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        ...(price != null && { price: Number(price) }),
        ...(stock != null && { stock: Number(stock) }),
      },
    });

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// DELETE a book
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Check if book exists
    const existing = await prisma.book.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Book not found." });
    }

    await prisma.book.delete({ where: { id } });
    res.status(200).json({ message: "Book deleted." });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
