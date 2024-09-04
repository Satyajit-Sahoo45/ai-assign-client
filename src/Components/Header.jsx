import React, { useState } from 'react';
import logo from "../assets/icons/logo.svg";
import LoginModal from '../Modal/LoginModal';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate("/")
        window.location.reload()
    };


    return (
        <header className="bg-white px-16 py-4 flex justify-between items-center shadow-md">
            <div className="flex items-center">
                <img src={logo} alt="DPhi Logo" className="h-9" onClick={() => navigate("/")} />
            </div>
            {
                !localStorage.getItem('accessToken') ?
                    <button
                        onClick={openModal}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button> : <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Logout
                    </button>
            }
            {!localStorage.getItem('accessToken') && isModalOpen && <LoginModal closeModal={closeModal} />}
        </header>
    );
};

export default Header;
