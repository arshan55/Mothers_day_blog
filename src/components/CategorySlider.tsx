'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  imageUrl: string;
  slug: string;
  excerpt: string;
}

interface CategorySliderProps {
  categoryName: string;
  articles: Article[];
  description: string;
}

export default function CategorySlider({ categoryName, articles, description }: CategorySliderProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 4;
      return nextIndex >= articles.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 4;
      return nextIndex < 0 ? Math.max(articles.length - 4, 0) : nextIndex;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const renderArticleCard = (article: Article) => (
    <Link
      key={article.id}
      href={`/articles/${article.slug}`}
      className="block group w-full"
    >
      <article className="bg-[#fff9e6] dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={article.imageUrl || '/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-pink-600 dark:text-pink-400">#{article.category}</span>
            <span className="text-xs text-pink-500 dark:text-pink-400">{article.readingTime}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex justify-end">
            <button className="text-sm font-medium text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-500 transition-colors">
              Read more
            </button>
          </div>
        </div>
      </article>
    </Link>
  );

  if (!mounted) return null;

  const visibleArticles = articles.slice(currentIndex, currentIndex + 4);

  return (
    <div className="py-3">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{categoryName}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={isAnimating || currentIndex === 0}
              className="p-2 rounded-full bg-pink-50 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-gray-600 disabled:opacity-30 transition-colors"
              aria-label="Previous articles"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating || currentIndex >= articles.length - 4}
              className="p-2 rounded-full bg-pink-50 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-gray-600 disabled:opacity-30 transition-colors"
              aria-label="Next articles"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Articles Grid */}
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleArticles.map(renderArticleCard)}
          </div>
        </div>
      </div>
    </div>
  );
} 