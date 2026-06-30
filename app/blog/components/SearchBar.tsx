'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  // Sync state with defaultValue if it changes from outside (e.g. navigation)
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      router.push(`/blog?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/blog');
    }
  };

  const handleClear = () => {
    setValue('');
    router.push('/blog');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      {/* Sticker/Tab above */}
      <div className="inline-block bg-primary text-white font-mono text-xs font-bold tracking-widest px-4 py-1.5 border-2 border-b-0 border-on-surface uppercase select-none">
        SEARCH ARCHIVE
      </div>
      
      {/* Main Bar */}
      <div className="flex border-4 border-on-surface bg-surface-container-low hard-shadow focus-within:translate-x-0.5 focus-within:translate-y-0.5 focus-within:shadow-none transition-all">
        <div className="flex-1 flex items-center relative pl-4">
          <Search className="w-5 h-5 text-on-surface-variant/70 shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search posts, tags, categories..."
            className="w-full bg-transparent text-on-surface font-mono text-sm font-bold p-4 pl-3 outline-none placeholder:text-on-surface-variant/40"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 mr-2 text-on-surface-variant/60 hover:text-primary transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className="bg-secondary-fixed text-on-secondary-fixed font-anton text-lg md:text-xl px-8 py-4 border-l-4 border-on-surface hover:bg-tertiary-fixed hover:text-on-tertiary-fixed active:bg-primary active:text-white transition-all uppercase cursor-pointer shrink-0"
        >
          SEARCH
        </button>
      </div>
    </form>
  );
}
