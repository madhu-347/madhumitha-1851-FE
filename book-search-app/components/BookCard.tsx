import { Book } from "@/lib/api";

import { User, Calendar } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  const authors = book.author_name?.join(", ") || "Author unknown";
  const year = book.first_publish_year || "Year not available";

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <h2 className="font-bold text-lg mb-3 line-clamp-2">
        {book.title}
      </h2>

      <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
        <User size={14} />
        <span>{authors}</span>
      </p>

      <p className="text-sm text-gray-600 flex items-center gap-2">
        <Calendar size={14} />
        <span>{year}</span>
      </p>
    </div>
  );
}
