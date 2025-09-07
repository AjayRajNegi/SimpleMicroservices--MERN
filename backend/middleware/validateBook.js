export function validateBookCreation(req, res, next) {
  const { title, author, price, stock } = req.body;

  if (!title || !author || !price == null || stock == null) {
    return res.status(400).json({
      error: "Title, author, price, and stock are required.",
    });
  }
  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ error: "Price must be a positive number." });
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res
      .status(400)
      .json({ error: "Stock must be a non-negative integer" });
  }

  next();
}

export function validateBookUpdate(req, res, next) {
  const { price, stock } = req.body;

  if (price == null && stock == null) {
    return res.status(400).json({
      error: "At least price or stock must be provided",
    });
  }

  if (price != null && (typeof price !== "number" || price < 0)) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }
  if (stock != null && (!Number.isInteger(stock) || stock < 0)) {
    return res
      .status(400)
      .json({ error: "Stock must be a non-negative integer" });
  }

  next();
}
