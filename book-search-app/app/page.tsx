"use client";

import { useEffect, useRef, useState } from "react";
import { fetchBooks, Book } from "@/lib/api";
import SearchInput from "@/components/SearchInput";
import BookGrid from "@/components/BookGrid";
import { X } from "lucide-react";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);


  /* ----------------------------
     Debounce Search
  ----------------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ----------------------------
     API Fetch
  ----------------------------- */
  useEffect(() => {
    async function loadBooks() {
      if (!debouncedTerm.trim()) {
        setAllBooks([]);
        setFilteredBooks([]);
        return;
      }

      setLoading(true);
      const results = await fetchBooks(debouncedTerm);
      setAllBooks(results);
      setLoading(false);
    }

    loadBooks();
  }, [debouncedTerm]);

  /* ----------------------------
     Client-side Filtering
  ----------------------------- */
  useEffect(() => {
    const filtered = allBooks.filter((book) =>
      book.title.toLowerCase().includes(debouncedTerm.toLowerCase())
    );

    setFilteredBooks(filtered);
  }, [debouncedTerm, allBooks]);

  /* ----------------------------
     Clear Search
  ----------------------------- */
  function clearSearch() {
    setSearchTerm("");
    setAllBooks([]);
    setFilteredBooks([]);
    inputRef.current?.focus();
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Book Explorer
          </h1>
          <p className="text-gray-600 mt-2">
            Search books instantly
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6 relative">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
          />

          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Result Count */}
        {!loading && debouncedTerm && (
          <p className="text-center text-sm text-gray-600 mb-6">
            Showing {filteredBooks.length} result
            {filteredBooks.length !== 1 ? "s" : ""}
            for “{debouncedTerm}”
          </p>
        )}

        {/* Book Grid */}
        <BookGrid books={filteredBooks} loading={loading} />
      </div>
    </main>
  );
}
