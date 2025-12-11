import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by book title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-lg shadow-sm"
      />
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
