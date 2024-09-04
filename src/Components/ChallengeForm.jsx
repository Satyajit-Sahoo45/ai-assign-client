import React, { useState } from 'react';
import axios from 'axios';
import Upload from "../assets/icons/bxs_cloud-upload.svg"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChallengeForm = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        image: '',
        level: 'easy',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: files ? files[0] : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (reader.readyState === 2) {
                    setFormData({ ...formData, image: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { name, startDate, endDate, description, image, level } = formData;
        const token = localStorage.getItem('accessToken');

        const data = {
            name: name,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            description: description,
            image: image,
            level: level.toUpperCase(),
            organizerId: JSON.parse(localStorage.getItem("user"))?.id
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/create-hackathon`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log(response, "responseresponse")

            response.status === 200 && toast.success("created hackathon 😊")
            navigate("/")
        } catch (error) {
            toast.error('Error creating hackathon ❗');
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-md mt-8 pb-10">
            <div className="bg-[#F8F9FD]">
                <h1 className="text-2xl font-bold mb-6 py-8 px-10">Challenge Details</h1>
            </div>

            <form className="px-10" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="challengeName" className="block text-gray-700 font-medium mb-2">
                        Challenge Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        placeholder="Enter challenge name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows="4"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file" className='cursor-pointer'>
                        {formData?.image ? (
                            <img
                                src={formData?.image}
                                alt=""
                                className="h-40 w-40 object-cover"
                            />
                        ) : (
                            <span className="text-[#666666] border-2 w-fit inline-flex border-[#D9D9D9] rounded-md py-1 px-6 items-center gap-2">
                                Upload
                                <img src={Upload} alt="upload icon" className='h-5 w-5' />
                            </span>
                        )}
                    </label>
                </div>

                <div className="mb-4">
                    <label htmlFor="levelType" className="block text-gray-700 font-medium mb-2">
                        Level Type
                    </label>
                    <select
                        id="level"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={formData.levelType}
                        onChange={handleChange}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 font-semibold"
                >
                    {loading ? "Creating..." : "Create Challenge"}
                </button>
            </form>
        </div>
    );
};

export default ChallengeForm;
