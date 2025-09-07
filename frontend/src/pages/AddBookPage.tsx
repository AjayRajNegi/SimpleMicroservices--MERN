import BookForm from "../components/BookForm";

export default function AddBookPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <BookForm editingBook={null} />
    </div>
  );
}
