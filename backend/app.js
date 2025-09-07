import cors from "cors";
import express from "express";
import bookRoute from "./routes/book.js";
import { PrismaClient } from "./generated/prisma/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/books", bookRoute);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
