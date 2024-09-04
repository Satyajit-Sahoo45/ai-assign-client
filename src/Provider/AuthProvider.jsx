import React from 'react';
import { Navigate } from 'react-router-dom';
import SessionProvider from './SessionProvider';
import toast from 'react-hot-toast';

const AuthProvider = ({ children }) => {
    const { currentUser, loading } = SessionProvider();

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="flex flex-col items-center">
                    <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 mb-4 animate-spin"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        toast.error('Please log in to access this service.');
        return <Navigate to="/" />;
    }

    return children;
};

export default AuthProvider;
