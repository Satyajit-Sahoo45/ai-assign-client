import React, { useEffect, useState } from 'react';
import Tick from "../assets/icons/charm_circle-tick.svg";

const ChallengeCard = ({ challenge }) => {
    const [status, setStatus] = useState('');
    const [timeInfo, setTimeInfo] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        const updateStatus = () => {
            const now = new Date();
            const startDate = new Date(challenge.startDate);
            const endDate = new Date(challenge.endDate);

            let newStatus = "";
            let newTimeInfo = { days: '00', hours: '00', minutes: '00', seconds: '00' };

            if (now < startDate) {
                newStatus = "Upcoming";
                const timeDiff = Math.abs(startDate - now);
                newTimeInfo = formatTime(timeDiff);
            } else if (now >= startDate && now <= endDate) {
                newStatus = "Active";
                const timeDiff = Math.abs(endDate - now);
                newTimeInfo = formatTime(timeDiff);
            } else {
                newStatus = "Past";
                newTimeInfo = endDate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
            }

            setStatus(newStatus);
            setTimeInfo(newTimeInfo);
        };

        updateStatus();
        const timer = setInterval(updateStatus, 1000);

        return () => clearInterval(timer);
    }, [challenge]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60) % 24;
        const days = Math.floor(totalMinutes / (60 * 24));
        return {
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
        };
    };

    return (
        <div className="bg-white text-blue-900 rounded-lg shadow-md flex flex-col text-center overflow-hidden">
            <img src={challenge.image.url} alt={challenge.title} className="h-40 w-full object-cover" />
            <div className="p-6 pt-4 flex flex-col justify-center items-center w-full">
                <div
                    className={`text-white py-1 px-4 rounded-md mb-2 inline-flex justify-center items-center w-fit ${status === "Upcoming" ? 'bg-[#e4cd8e]' :
                        status === "Active" ? 'bg-[#44924C]' :
                            'bg-[#FF3C00]'
                        }`}
                >
                    {status}
                </div>
                <h3 className="text-lg font-bold mb-2 min-h-[3rem]">{challenge.name}</h3>
                <div className="flex-grow">
                    {(status === "Active" || status === "Upcoming") && (
                        <div className="text-gray-600 mb-4">
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">
                                    {status === "Upcoming" ? "Starts in" : "Ends in"}
                                </span>
                            </div>
                            <div className="flex justify-center mb-2">
                                <div className="flex flex-col items-center">
                                    <span className="text-lg font-bold">{timeInfo.days}</span>
                                    <span className="text-xs">Days</span>
                                </div>
                                <span className="mx-2 text-2xl font-bold">:</span>
                                <div className="flex flex-col items-center">
                                    <span className="text-lg font-bold">{timeInfo.hours}</span>
                                    <span className="text-xs">Hours</span>
                                </div>
                                <span className="mx-2 text-2xl font-bold">:</span>
                                <div className="flex flex-col items-center">
                                    <span className="text-lg font-bold">{timeInfo.minutes}</span>
                                    <span className="text-xs">Mins</span>
                                </div>
                                <span className="mx-2 text-2xl font-bold">:</span>
                                <div className="flex flex-col items-center">
                                    <span className="text-lg font-bold">{timeInfo.seconds}</span>
                                    <span className="text-xs">Secs</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {status === "Past" && (
                        <div className="text-gray-600 mb-4">
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Ended on</span>
                            </div>
                            <p className='text-sm text-gray-600'>{timeInfo}</p>
                        </div>
                    )}
                </div>
                <a href={`/hackathon/${challenge.id}`} className="bg-green-600 text-white px-4 py-2 rounded-md mt-auto flex gap-2 items-center">
                    <img src={Tick} alt="Tick" className="h-4 w-4" />
                    Participate Now
                </a>
            </div>
        </div>
    );
};

export default ChallengeCard;
