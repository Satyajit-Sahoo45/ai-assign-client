import React from 'react';
import { ChevronDown } from 'lucide-react';

const FilterDropdown = ({ isOpen, toggleFilterDropdown, selectedStatus, selectedLevel, onStatusChange, onLevelChange, selectedSort, onSortChange }) => (
    <div className="relative mt-2 md:mt-0 flex flex-col items-center">
        <button
            onClick={toggleFilterDropdown}
            className="bg-gray-200 text-blue-900 px-4 py-2 rounded-lg flex items-center transition-all duration-300"
        >
            <span className="flex items-center justify-between w-full gap-2">
                Filter
                <ChevronDown size={18} className={`text-black transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </span>
        </button>
        <div
            className={`absolute left-0 top-full mt-2 bg-white text-black rounded-lg shadow-lg p-4 w-64 overflow-y-auto transition-all duration-300 ease-in-out custom-scrollbar ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
        >

            <h3 className="font-bold mb-2">Filter</h3>
            <div className="border-b mb-3 pb-2">
                <p className="text-sm font-medium">Status</p>
                <div className="flex flex-col gap-2 mt-2">
                    {["All", "Active", "Upcoming", "Past"].map((status, index) => (
                        <label className="flex items-center" key={index}>
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={() => onStatusChange(status)}
                                checked={selectedStatus.includes(status)}
                            /> {status}
                        </label>
                    ))}
                </div>
            </div>
            <div className="border-b mb-3 pb-2">
                <p className="text-sm font-medium">Sort By</p>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            name="sortBy"
                            value="newest"
                            onChange={(e) => onSortChange(e.target.value)}
                            checked={selectedSort === 'newest'}
                        /> Newest First
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="mr-2"
                            name="sortBy"
                            value="oldest"
                            onChange={(e) => onSortChange(e.target.value)}
                            checked={selectedSort === 'oldest'}
                        /> Oldest First
                    </label>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium">Level</p>
                <div className="flex flex-col gap-2 mt-2">
                    {["Easy", "Medium", "Hard"].map((level, index) => (
                        <label className="flex items-center" key={index}>
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={() => onLevelChange(level)}
                                checked={selectedLevel.includes(level)}
                            /> {level}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default FilterDropdown;
