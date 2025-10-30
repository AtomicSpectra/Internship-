
'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-pink-500 text-white font-semibold shadow-sm group-hover:shadow transition-shadow">PM</span>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 group-hover:from-blue-700 group-hover:to-pink-600 transition-colors">
                PrepMitra
              </span>
            </Link>
          </div>

          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className={`text-gray-600 hover:text-gray-900 ${
                pathname === '/features' ? 'font-bold' : ''
              }`}
            >
              Features
            </Link>
            <Link
              href="/about"
              className={`text-gray-600 hover:text-gray-900 ${
                pathname === '/features' ? 'font-bold' : ''
              }`}
            >
              About Us
            </Link>
            <Link
              href="/pricing"
              className={`text-gray-600 hover:text-gray-900 ${
                pathname === '/pricing' ? 'font-bold' : ''
              }`}
            >
              Pricing
            </Link>

            <Link href="/dashboard">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}