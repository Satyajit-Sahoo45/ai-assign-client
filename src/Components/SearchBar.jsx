import React from 'react';
import { SearchIcon } from 'lucide-react';

const SearchBar = ({ onChange }) => (
    <div className="relative w-full max-w-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon size={18} className="text-gray-500" />
        </div>
        <input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={onChange}
        />
    </div>
);

export default SearchBar;
