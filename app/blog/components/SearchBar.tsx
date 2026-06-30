'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use, useTransition, useRef } from 'react';

import { BlogPostMetaData } from '@/app/_types/blog';
import { getSearchIndexEngine } from '@/app/_utils/search-init';
import BlogTags from './BlogTags';
import { useClickOutside } from '@/app/hooks/useClickOutSide';

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const searchEngine = use(getSearchIndexEngine());
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const [searchSuggestions, setSearchSuggestions] = useState<BlogPostMetaData[]>([]);
  const suggestionListRef = useRef(null);

  useClickOutside(suggestionListRef, () => {
    setSearchSuggestions([]);
  });

  const [loading, startTransition] = useTransition();

  // Sync state with defaultValue if it changes from outside (e.g. navigation)
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.SubmitEvent) => {
    setSearchSuggestions([]);
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
    setSearchSuggestions([]);
    router.push('/blog');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value;
    setValue(searchKey);
    if (searchEngine && searchKey.trim().length > 2) {
      startTransition(() => {
        const matches = searchEngine.search(searchKey) as unknown as BlogPostMetaData[];
        setSearchSuggestions(matches);
      });
    } else if (searchKey.trim().length <= 2) {
      setSearchSuggestions([]);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
        {/* Sticker/Tab above */}
        <div className="inline-block bg-primary text-white font-mono text-xs font-bold tracking-widest px-4 py-1.5 border-2 border-b-0 border-on-surface uppercase select-none">
          SEARCH ARCHIVE
        </div>
        
        {/* Main Bar */}
        <div className="flex border-4 border-on-surface bg-surface-container-low hard-shadow transition-all">
          <div className="flex-1 flex items-center relative pl-4">
            <Search className="w-5 h-5 text-on-surface-variant/70 shrink-0" />
            <input
              type="text"
              value={value}
              onChange={handleSearch}
              placeholder={"Search posts, tags, categories..."}
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
      {
        (!loading && searchSuggestions && searchSuggestions.length > 0) && (
          <div ref={suggestionListRef} className="w-full max-w-2xl mx-auto absolute z-40 left-1/2 -translate-x-1/2">
            <ul className="bg-surface-container-high border-4 p-4 flex flex-col gap-2 max-h-131.25 overflow-auto">
              {
                searchSuggestions.map((el, idx) => (
                  <li key={idx} className="p-2">
                    <Link href={`/blog/${el.id}`} className="flex gap-4 hover:bg-surface-container">
                      {
                        el.image && (
                          <Image
                            alt={el.title}
                            src={el.image}
                            width={200}
                            height={200}
                          />
                        )
                      }
                      <div className="p-2">
                        <h3 className="headline-lg text-xl md:text-2xl uppercase group-hover:text-primary transition-colors">
                          {el.title}
                        </h3>
                        <BlogTags tags={el.tags ? el.tags : ""} />
                        <span className="body-md text-on-surface-variant mb-6 max-w-full line-clamp-2">
                          {el.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </>
  );
}
