'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-pink-50 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-600 dark:text-pink-400">About</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A special tribute to mothers everywhere, celebrating their love, strength, and unwavering support.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-600 dark:text-pink-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-600 dark:text-pink-400">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to receive heartwarming stories and tributes.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-grow"
              />
              <button
                type="submit"
                className="bg-pink-500 dark:bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-600 dark:hover:bg-pink-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-pink-200 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Mother's Day Tribute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 