import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample data
let books = [
  { id: 1, title: "1984", author: "George Orwell", price: 15.99, stock: 10 },
  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 20.5,
    stock: 5,
  },
];

// GET all books (with optional ?author=)
app.get("/books", (req, res) => {
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
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(book);
});

// POST create a book
app.post("/books", (req, res) => {
  const { title, author, price, stock } = req.body;
  if (!title || !author || price == null || stock == null) {
    return res
      .status(400)
      .json({ error: "Title, author, price, and stock are required" });
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

// PUT update book (only price/stock)
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found!" });
  }

  const { price, stock } = req.body;
  if (price == null && stock == null) {
    return res
      .status(400)
      .json({ error: "At least price or stock must be provided" });
  }

  if (price != null) book.price = price;
  if (stock != null) book.stock = stock;

  res.status(200).json(book);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Book not found." });
  }
  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
