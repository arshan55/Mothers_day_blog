'use client';

import Link from 'next/link';
import Image from 'next/image';
import ArticleCard from '@/components/ArticleCard';
import articlesData from '@/data/articles.json';
import HeroSlider from '@/components/HeroSlider';
import { useRef, useState, useMemo } from 'react';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import type { Article } from '@/types/article';

const articles: Article[] = articlesData.articles;

const categories = [
  { id: 'all', name: 'All', description: 'View all stories' },
  { id: 'stories', name: 'Stories', description: 'Personal tributes and memories' },
  { id: 'recipes', name: 'Recipes', description: 'Mom\'s special dishes' },
  { id: 'wisdom', name: 'Wisdom', description: 'Life lessons from mothers' },
  { id: 'traditions', name: 'Traditions', description: 'Family customs and celebrations' },
  { id: 'letters', name: 'Letters', description: 'Dear Mom messages' },
  { id: 'celebrations', name: 'Celebrations', description: 'Special moments together' }
];

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {
      all: articles.length
    };
    
    articles.forEach(article => {
      const categoryId = article.category.toLowerCase();
      counts[categoryId] = (counts[categoryId] || 0) + 1;
    });
    
    return counts;
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById('recent-articles')?.offsetTop,
      behavior: 'smooth'
    });
  };

  const handleSearch = (filtered: typeof articles) => {
    setFilteredArticles(filtered);
    setSelectedCategory('all');
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        article => article.category.toLowerCase() === categoryId
      );
      setFilteredArticles(filtered);
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <main className="min-h-screen bg-[#fff9e6] dark:bg-gray-900 font-sans">
      {/* Header Section with Search */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 border-b dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                Mother's Day Stories
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Celebrating the love, wisdom, and strength of mothers everywhere
              </p>
            </div>
            <div className="w-full md:w-auto max-w-sm">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories Section */}
        <section className="py-16 bg-[#fff5d9] dark:bg-gray-800 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-medium mb-12 text-gray-800 dark:text-white">
              Explore by category
            </h2>
            
            <div className="relative">
              {/* Left Arrow */}
              {showLeftArrow && (
                <button
                  onClick={() => scroll('left')}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-pink-50 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-gray-600 p-2 rounded-full shadow-sm transition-colors"
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Right Arrow */}
              {showRightArrow && (
                <button
                  onClick={() => scroll('right')}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-pink-50 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-gray-600 p-2 rounded-full shadow-sm transition-colors"
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Categories Container */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 -mb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex-shrink-0 w-64 aspect-square flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all rounded-2xl ${
                      selectedCategory === category.id
                        ? 'bg-pink-50 dark:bg-pink-900/20 scale-105 shadow-lg shadow-pink-100 dark:shadow-pink-900/10'
                        : 'bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:scale-105 shadow-md hover:shadow-lg hover:shadow-pink-100/50 dark:hover:shadow-pink-900/10'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-transparent dark:from-pink-500/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800 dark:text-white p-6 text-center">
                      <div className="w-12 h-0.5 bg-pink-200 dark:bg-pink-700 mb-4"></div>
                      <h3 className="text-2xl font-medium mb-2 text-pink-700 dark:text-pink-300">{category.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{category.description}</p>
                      <span className="px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-full text-sm text-pink-700 dark:text-pink-300 font-medium">
                        {categoryCounts[category.id] || 0} articles
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Articles Section */}
        <section id="recent-articles" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-medium mb-12 text-gray-800 dark:text-white">
              {selectedCategory === 'all' ? 'Recent articles' : `${categories.find(c => c.id === selectedCategory)?.name} articles`}
            </h2>
            <div className="space-y-8">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {filteredArticles.length > articlesPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </section>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 font-medium">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
} 