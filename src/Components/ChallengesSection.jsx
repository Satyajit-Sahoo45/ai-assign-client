import React, { useState, useMemo, useCallback, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import ChallengeCard from './ChallengeCard';
import { X } from 'lucide-react';
import axios from 'axios';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const ChallengesSection = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: [],
        level: [],
        searchQuery: '',
        sortBy: 'newest'
    });
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading as true

    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/get-hackathon`);
                setChallenges(response.data.hackathons);
            } catch (error) {
                toast.error("Error fetching challenges !");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    const handleFilterChange = useCallback((type, value) => {
        setFilters(prev => {
            const updatedFilter = prev[type].includes(value)
                ? prev[type].filter(item => item !== value)
                : [...prev[type], value];

            return {
                ...prev,
                [type]: updatedFilter,
            };
        });
    }, []);

    const handleSearchChange = useCallback((e) => {
        setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    }, []);

    const toggleFilterDropdown = useCallback(() => {
        setIsFilterOpen(prev => !prev);
    }, []);

    const removeFilter = useCallback((type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item !== value)
        }));
    }, []);

    const handleSortChange = useCallback((value) => {
        setFilters(prev => ({ ...prev, sortBy: value }));
    }, []);

    const filteredChallenges = useMemo(() => {
        setLoading(true); // Start loading while processing the filtering and sorting
        const uppercaseStatusFilters = filters?.status?.map(status => status.toUpperCase());
        const uppercaseLevelFilters = filters.level.map(level => level.toUpperCase());

        let challengesToDisplay = challenges.map(challenge => {
            const challengeLevel = challenge?.level?.toUpperCase();
            const startTime = dayjs(challenge?.startDate);
            const endTime = dayjs(challenge?.endDate);
            const now = dayjs();

            let status = 'Upcoming';
            if (now.isAfter(endTime)) {
                status = 'Past';
            } else if (now.isAfter(startTime)) {
                status = 'Active';
            }

            const challengeStatus = status.toUpperCase();

            const matchesStatus = uppercaseStatusFilters?.length === 0 || uppercaseStatusFilters?.includes(challengeStatus);
            const matchesLevel = uppercaseLevelFilters?.length === 0 || uppercaseLevelFilters?.includes(challengeLevel);
            const matchesSearchQuery = challenge.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

            return matchesStatus && matchesLevel && matchesSearchQuery ? { ...challenge, status: challengeStatus } : null;
        }).filter(Boolean);

        challengesToDisplay = challengesToDisplay.sort((a, b) => {
            if (filters.sortBy === 'newest') {
                return dayjs(b.startDate).diff(dayjs(a.startDate));
            } else {
                return dayjs(a.startDate).diff(dayjs(b.startDate));
            }
        });

        setLoading(false); // Stop loading after filtering and sorting are done

        return challengesToDisplay;
    }, [challenges, filters]);


    return (
        <section className="bg-[#002A3B] text-white py-20 px-16">
            <h2 className="text-3xl font-bold text-center mb-10">Explore Challenges</h2>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center items-center mb-6 flex-col gap-2 md:flex-row relative">
                    <SearchBar onChange={handleSearchChange} />
                    <FilterDropdown
                        isOpen={isFilterOpen}
                        toggleFilterDropdown={toggleFilterDropdown}
                        selectedStatus={filters.status}
                        selectedLevel={filters.level}
                        onStatusChange={(status) => handleFilterChange('status', status)}
                        onLevelChange={(level) => handleFilterChange('level', level)}
                        selectedSort={filters.sortBy}
                        onSortChange={handleSortChange}
                    />
                </div>
                {(filters.status.length > 0 || filters.level.length > 0) && (
                    <div className="mb-6 flex flex-wrap gap-2 justify-center items-center">
                        {filters.status.map(status => (
                            <span key={status} className="bg-[#777880] text-white px-3 py-1 rounded-full flex items-center">
                                {status}
                                <button
                                    onClick={() => removeFilter('status', status)}
                                    className="ml-2 p-[0.5] rounded-full bg-white"
                                >
                                    <X size={12} className='text-[#777880]' />
                                </button>
                            </span>
                        ))}
                        {filters.level.map(level => (
                            <span key={level} className="bg-[#777880] text-white px-3 py-1 rounded-full flex items-center">
                                {level}
                                <button
                                    onClick={() => removeFilter('level', level)}
                                    className="ml-2 p-[0.5] rounded-full bg-white"
                                >
                                    <X size={12} className='text-[#777880]' />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="flex justify-center items-center col-span-1 sm:col-span-2 lg:col-span-3 mt-14">
                            <div className="flex space-x-2">
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-0"></div>
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-400"></div>
                            </div>
                        </div>
                    ) : (
                        filteredChallenges.length > 0 ? (
                            filteredChallenges.map((challenge, index) => (
                                <ChallengeCard key={index} challenge={challenge} />
                            ))
                        ) : (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center items-center h-full">
                                <p className="text-gray-600 text-center">
                                    No Match Found 🤔
                                </p>
                            </div>
                        )
                    )}
                </div>

            </div>
        </section>
    );
};

export default ChallengesSection;
