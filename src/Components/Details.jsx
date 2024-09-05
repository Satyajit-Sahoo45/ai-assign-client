import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock } from "lucide-react";
import level from "../assets/icons/level.svg";
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import toast from 'react-hot-toast';

const Details = () => {
    const { id } = useParams();
    const [hackathon, setHackathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        image: null,
        level: 'EASY',
    });

    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/get-hackathon/${id}`);
                setHackathon(response.data);
                setFormData({
                    name: response.data.name,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    description: response.data.description,
                    image: response.data.image,
                    levelType: response.data.levelType,
                });
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHackathon();
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (reader.readyState === 2) {
                    setFormData((prev) => ({ ...prev, image: { public_id: formData.image.public_id, url: reader.result } }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        setLoadingUpdate(true);

        try {
            const data = {
                name: formData.name,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
                description: formData.description,
                image: formData.image,
                level: formData.level.toUpperCase(),
            }
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URI}/update-hackathon/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            response.status === 200 && toast.success('Hackathon updated successfully');
            setIsModalOpen(false);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoadingUpdate(false)
        }

    };

    const handleDelete = async (e) => {
        const token = localStorage.getItem('accessToken');
        setLoadingDelete(true)
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URI}/delete-hackathon/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            response.status === 204 && toast.success('Hackathon deleted successfully');
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoadingDelete(false);
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-0"></div>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="w-full bg-[#0E3A5E] p-8">
                <div className="flex flex-col justify-start gap-6 p-4 sm:p-6 md:p-12">
                    <span className="bg-[#FFD54F] text-[#0E3A5E] inline-flex justify-center items-center gap-2 w-fit rounded-lg px-4 py-2 text-sm font-semibold">
                        <Clock size={14} /> Starts on {new Date(hackathon.startDate).toLocaleDateString()} at {new Date(hackathon.startDate).toLocaleTimeString()}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        {hackathon.name}
                    </h1>
                    <p className="text-white text-sm sm:text-base mb-4">
                        {hackathon.description}
                    </p>
                    <div className="bg-white py-2 px-4 sm:px-6 w-fit flex gap-2 items-center justify-center rounded-lg text-sm font-semibold">
                        <img src={level} alt="level" className="h-4 w-4 text-black" /> {hackathon.level}
                    </div>
                </div>
            </div>

            <div className="w-full bg-white shadow-md flex flex-col-reverse sm:flex-row justify-between px-4 sm:px-10 md:px-20 relative items-center">
                <div className="relative py-4 sm:py-6 font-bold text-base sm:text-lg">
                    <span className="absolute bottom-0 left-0 w-full h-[4px] sm:h-[6px] bg-[#388E3C] rounded-md"></span>
                    Overview
                </div>

                {hackathon?.organizerId === JSON.parse(localStorage.getItem("user"))?.id && (
                    <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
                        <button onClick={() => setIsModalOpen(true)} className="bg-[#4CAF50] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#388E3C]">
                            Edit
                        </button>
                        <button className="bg-white text-[#DC1414] border-2 border-[#DC1414] px-4 sm:px-6 py-2 rounded-lg" onClick={handleDelete}>
                            {loadingDelete ? (
                                <div className="flex space-x-2">
                                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-0"></div>
                                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
                                </div>
                            ) : "Delete"}
                        </button>
                    </div>
                )}
            </div>

            <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-10 md:px-20">
                <p className="text-[#0E3A5E] text-sm sm:text-base mb-4">
                    {hackathon.description}
                </p>
            </div>

            <Modal
                isOpen={isModalOpen}
                loadingUpdate={loadingUpdate}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
                loading={loading}
            />
        </div>

    );
};

export default Details;
