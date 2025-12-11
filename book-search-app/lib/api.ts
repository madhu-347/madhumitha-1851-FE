export interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

export async function fetchBooks(query: string): Promise<Book[]> {
  if (!query) return [];

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );

  const data = await res.json();
  return data.docs || [];
}
