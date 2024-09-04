import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const LoginModal = ({ closeModal }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole.toUpperCase());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isSignup) {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/signup`, {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password,
                    role: role,
                });
                response.status === 201 && toast.success('Signup successful!');
                setIsSignup(false)
            } else {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/login`, {
                    email: credentials.email,
                    password: credentials.password,
                });
                const { accessToken, user } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                if (response.status === 200) { toast.success('Login successful!'); }
                closeModal();
                window.location.reload()
            }
        } catch (error) {
            toast.error(`${isSignup ? 'Signup' : 'Login'} failed: ${error.response?.data.error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
                    &times;
                </button>
                {isSignup ? (
                    <div>
                        {role === "" ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Select Role</h2>
                                <button
                                    onClick={() => handleRoleSelect('USER')}
                                    className="block w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-600 transition"
                                >
                                    Signup as User
                                </button>
                                <button
                                    onClick={() => handleRoleSelect('ADMIN')}
                                    className="block w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-600 transition"
                                >
                                    Signup as Admin
                                </button>
                                <button
                                    onClick={() => setIsSignup(false)}
                                    className="block w-full text-blue-500 py-2 px-4 rounded hover:text-blue-600 transition mt-2"
                                >
                                    Already have an account? Login
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-xl font-semibold mb-4">Signup as {role === 'USER' ? 'User' : 'Admin'}</h2>
                                <label className="block mb-2">
                                    Username
                                    <input
                                        type="text"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 px-2 py-1 border rounded"
                                        required
                                    />
                                </label>
                                <label className="block mb-2">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 px-2 py-1 border rounded"
                                        required
                                    />
                                </label>
                                <label className="block mb-4">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 px-2 py-1 border rounded"
                                        required
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${loading && "cursor-not-allowed"}`}
                                >
                                    {loading ? <div className="flex space-x-2">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse animation-delay-0"></div>
                                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse animation-delay-200"></div>
                                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse animation-delay-400"></div>
                                    </div> : "SignUp"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setIsSignup(false); setRole(null) }}
                                    className="block w-full text-blue-500 py-2 px-4 rounded hover:text-blue-600 transition mt-2"
                                >
                                    Already have an account? Login
                                </button>
                            </form>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-xl font-semibold mb-4">Login</h2>
                        <label className="block mb-2">
                            Email
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-2 py-1 border rounded"
                                required
                            />
                        </label>
                        <label className="block mb-4">
                            Password
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-2 py-1 border rounded"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${loading && "cursor-not-allowed"}`}
                        >
                            {loading ? <div className="flex space-x-2">
                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse animation-delay-0"></div>
                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse animation-delay-200"></div>
                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse animation-delay-400"></div>
                            </div> : "Login"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsSignup(true)}
                            className="block w-full text-blue-500 py-2 px-4 rounded hover:text-blue-600 transition mt-2"
                        >
                            Don't have an account? Signup
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
