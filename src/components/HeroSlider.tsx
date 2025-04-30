'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import articlesData from '@/data/articles.json';

interface Story {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
}

// Select featured stories from different categories
const stories: Story[] = [
  articlesData.articles.find(a => a.slug === 'heartwarming-mothers-day-stories')!,
  articlesData.articles.find(a => a.slug === 'secret-family-recipes')!,
  articlesData.articles.find(a => a.slug === 'early-years-wisdom')!,
  articlesData.articles.find(a => a.slug === 'holiday-traditions')!,
  articlesData.articles.find(a => a.slug === 'mothers-day-world-celebrations')!
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="relative h-[80vh] bg-gray-100 dark:bg-gray-800">
      {/* Background Images */}
      {stories.map((story, index) => (
        <div
          key={story.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Content Box Container - positioned at bottom left */}
      <div className="absolute bottom-12 left-12 z-20 max-w-xl">
        {/* Content Box */}
        <div className="relative bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
          {/* Navigation Arrows - positioned on top of the box */}
          <div className="absolute -top-12 left-0 flex space-x-3">
            <button
              onClick={prevSlide}
              className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider text-sm">
            {stories[currentSlide].category}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {stories[currentSlide].title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-base">
            {stories[currentSlide].excerpt}
          </p>
          <Link
            href={`/articles/${stories[currentSlide].slug}`}
            className="inline-block bg-black dark:bg-gray-700 text-white px-6 py-2 rounded-none hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            Read more
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 