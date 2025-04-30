export default function AboutPage() {
  return (
    <main className="min-h-screen py-12 bg-[#fff9e6] dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mb-8 shadow-sm">
          <h1 className="text-4xl font-serif font-bold text-center text-gray-900 dark:text-white">
            About Mother's Day Tribute
          </h1>
          <div className="w-20 h-1 bg-pink-200 dark:bg-pink-700 mx-auto mt-6"></div>
        </div>

        {/* Main Content */}
        <div className="bg-[#fff5d9] dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Welcome to Mother's Day Tribute, a special space dedicated to celebrating the incredible
              women who shape our lives. Our mission is to create a platform where people can share
              their heartfelt stories, experiences, and tributes to the mothers who have made a
              difference in their lives.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Whether it's a story of unconditional love, a lesson learned, or a moment of inspiration,
              we believe every mother's story deserves to be told. Our collection of articles spans
              various categories, from personal stories to health and wellness advice, all centered
              around the theme of motherhood and maternal love.
            </p>

            <h2 className="text-2xl font-serif font-semibold mt-12 mb-6 text-pink-700 dark:text-pink-300">
              Our Categories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Stories', desc: 'Personal tributes and memories' },
                { name: 'Recipes', desc: 'Mom\'s special dishes' },
                { name: 'Wisdom', desc: 'Life lessons from mothers' },
                { name: 'Traditions', desc: 'Family customs and celebrations' },
                { name: 'Letters', desc: 'Dear Mom messages' },
                { name: 'Memories', desc: 'Cherished moments' },
                { name: 'Celebrations', desc: 'Special moments together' }
              ].map((category) => (
                <div 
                  key={category.name} 
                  className="bg-white dark:bg-gray-700/50 rounded-xl p-4 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all shadow-sm hover:shadow-md hover:shadow-pink-100/50 dark:hover:shadow-pink-900/10"
                >
                  <h3 className="font-medium text-pink-700 dark:text-pink-300 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{category.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-900/20 dark:to-transparent rounded-xl p-6 mt-12">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We invite you to explore our collection of articles, share your own stories, and join us
                in celebrating the remarkable women who have shaped our lives. Together, let's create a
                lasting tribute to the power of a mother's love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 