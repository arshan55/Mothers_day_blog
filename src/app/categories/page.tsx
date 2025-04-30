'use client';

import data from '@/data/articles.json';
import CategorySlider from '@/components/CategorySlider';

export default function CategoriesPage() {
  // Group articles by category
  const articlesByCategory = data.categories.reduce((acc, category) => {
    const categoryArticles = data.articles.filter(
      article => article.category === category.name
    );
    acc[category.name] = categoryArticles;
    return acc;
  }, {} as { [key: string]: typeof data.articles });

  return (
    <main className="min-h-screen py-12 bg-[#fff9e6] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mb-12">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            Explore our collection of heartfelt stories and tributes
          </p>
        </div>

        <div className="space-y-16">
          {data.categories.map((category) => (
            <div key={category.id} className="bg-[#fff5d9] dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <CategorySlider 
                categoryName={category.name}
                articles={articlesByCategory[category.name] || []}
                description={category.description}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 