'use client';

import { useState } from 'react';
import articlesData from '@/data/articles.json';
import type { Article } from '@/types/article';

interface SearchBarProps {
  onSearch: (filteredArticles: Article[]) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = articlesData.articles.filter(
      (article: Article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase())
    );
    onSearch(filtered);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
    </div>
  );
} 