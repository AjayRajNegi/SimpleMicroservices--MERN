export default function errorHandler(err, req, res, next) {
  console.log("Hello");
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}
