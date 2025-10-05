// components/shared/Header.js
'use client';

// import { Bars3Icon } from '@heroicons/react/24/outline';
import { BarChart3, MenuIcon, UserIcon } from 'lucide-react';

export default function Header({ onMenuClick, title, user, onLogout }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left side - Menu + Title */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900 mr-2"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>

        {/* Right side - User info */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className=" sm:inline text-sm text-gray-700">
                {user.name}
              </span>
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
            </>
          ) : (
            {/* <a
              href="/admin/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Logout
            </a> */}
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="text-sm text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
