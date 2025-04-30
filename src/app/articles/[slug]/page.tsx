'use client';

import articlesData from '@/data/articles.json';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articlesData.articles.find((a) => a.slug === params.slug);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fff9e6] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-[#fff5d9] dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xl font-serif text-gray-900 dark:text-white">
              Mother's Day Tribute
            </span>
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[60vh] bg-[#fff2cc] dark:bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto bg-[#ffe5cc] dark:bg-gray-800 -mt-32 relative z-10 rounded-t-3xl overflow-hidden">
        {/* Article Header */}
        <div className="px-8 pt-12 pb-8 text-center">
          <h1 className="text-4xl font-serif mb-4 text-gray-900 dark:text-white">
            {article.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
            <span>•</span>
            <span>{article.submissionDate}</span>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button className="p-2 bg-[#ffdbcc] dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-[#ffe5cc] dark:hover:bg-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button className="p-2 bg-[#ffdbcc] dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-[#ffe5cc] dark:hover:bg-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="px-8 pb-12">
          {/* Author Info */}
          <div className="mb-8 p-4 bg-[#fff2cc] dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#ffdbcc] dark:bg-gray-600 flex items-center justify-center">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {article.authorName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{article.authorName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Published on {article.submissionDate}</p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-base max-w-none dark:prose-invert">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                const heading = paragraph.replace('## ', '');
                return (
                  <h2 
                    key={index} 
                    id={heading.toLowerCase().replace(/\s+/g, '-')}
                    className="text-xl font-normal text-gray-800 dark:text-white mt-8 mb-4"
                  >
                    {heading}
                  </h2>
                );
              }
              return (
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-light text-base">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
} 