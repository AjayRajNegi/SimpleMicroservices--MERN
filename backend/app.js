import express from "express";
import bookRoute from "./routes/books.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/books", bookRoute);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
