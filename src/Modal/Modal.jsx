import React from 'react';
import ReactDOM from 'react-dom';
import Upload from '../assets/icons/bxs_cloud-upload.svg'
import Gal from '../assets/icons/bi_image-fill.svg'
import { ArrowRight } from 'lucide-react';

const Modal = ({ isOpen, loadingUpdate, onClose, formData, handleChange, handleSubmit, handleFileChange, loading }) => {
    if (!isOpen) return null;
    console.log(formData)

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-end z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-md h-screen p-8 overflow-auto transform transition-transform duration-300 ease-in-out" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                    &times;
                </button>
                <h1 className="text-2xl font-bold mb-6">Challenge Details</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Challenge Name</label>
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
                        <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={new Date(formData.startDate).toISOString().slice(0, 10)}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={new Date(formData.endDate).toISOString().slice(0, 10)}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
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
                                <div className="p-2 bg-[#F8F9FD]">
                                    <img
                                        src={formData?.image?.url || formData?.image}
                                        alt=""
                                        className="w-1/1 h-32 object-cover rounded-md mb-2"
                                    />
                                    <span
                                        className="flex gap-2 items-center text-green-600 hover:underline"
                                    >
                                        <img src={Gal} className='h-4 w-4' alt='' />
                                        Change image <ArrowRight size={16} />
                                    </span>
                                </div>
                            ) : (
                                <span className="text-[#666666] border-2 w-fit inline-flex border-[#D9D9D9] rounded-md py-1 px-6 items-center gap-2">
                                    Upload
                                    <img src={Upload} alt="upload icon" className='h-5 w-5' />
                                </span>
                            )}
                        </label>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="level" className="block text-gray-700 font-medium mb-2">Level Type</label>
                        <select
                            id="level"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={formData.level}
                            onChange={handleChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-white text-[#DC1414] border-2 border-[#DC1414] px-6 py-3 rounded-lg"
                    >
                        {loadingUpdate ? <div className="flex space-x-2">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-0"></div>
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
                        </div> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
