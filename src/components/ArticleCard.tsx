'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    category: string;
    imageUrl: string;
    readingTime?: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-[#fff5d9] dark:bg-gray-800 rounded-lg overflow-hidden border border-pink-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Container */}
        <div className="relative w-full md:w-2/5 aspect-[4/3]">
          <Image
            src={article.imageUrl || '/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="text-sm text-pink-600 dark:text-pink-400 mb-2">#{article.category}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {article.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {article.excerpt}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-pink-500 dark:text-pink-400">
              {article.readingTime || '5 minutes reading'}
            </span>
            <Link 
              href={`/articles/${article.slug}`}
              className="bg-pink-600 dark:bg-pink-500 text-white px-4 py-1 text-sm hover:bg-pink-700 dark:hover:bg-pink-600 transition-colors rounded-full"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 