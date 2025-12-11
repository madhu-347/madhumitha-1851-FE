import { Book } from "@/lib/api";
import BookCard from "./BookCard";
import BookSkeleton from "./BookSkeleton";
import { BookX } from "lucide-react";

export default function BookGrid({
  books,
  loading,
}: {
  books: Book[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
        <BookX size={42} className="mb-4 text-gray-400" />
        <p className="text-lg font-medium">No books found</p>
        <p className="text-sm mt-1">
          Try searching with another title.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}
