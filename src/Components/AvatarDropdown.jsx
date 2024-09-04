import React, { useState } from 'react';

const AvatarDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
            >
                <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border-2 border-gray-300"
                />
                <span className="text-gray-700">Username</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="py-1">
                        <a
                            href="#profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Profile
                        </a>
                        <a
                            href="#settings"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Settings
                        </a>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarDropdown;
