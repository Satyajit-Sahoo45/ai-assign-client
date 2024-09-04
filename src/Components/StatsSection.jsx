import React from 'react';
import Group from "../assets/icons/Group 1000002515.svg";
import Group2 from "../assets/icons/Group 1000002516.svg";
import Group3 from "../assets/icons/Group 1000002518.svg";

const StatsSection = () => {
    return (
        <section className="bg-[#002A3B] text-white py-10 flex flex-col items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full place-items-center">
                <div className='flex justify-center items-center space-x-4'>
                    <img src={Group} alt={"first"} className="h-12" />
                    <div className='text-start'>
                        <h2 className="text-2xl font-bold">100K+</h2>
                        <p>AI model submissions</p>
                    </div>
                </div>
                <div className='flex justify-center items-center space-x-4'>
                    <img src={Group2} alt={"second"} className="h-12" />
                    <div className='text-start'>
                        <h2 className="text-2xl font-bold">50K+</h2>
                        <p>Data Scientists</p>
                    </div>
                </div>
                <div className='flex justify-center items-center space-x-4'>
                    <img src={Group3} alt={"third"} className="h-12" />
                    <div className='text-start'>
                        <h2 className="text-2xl font-bold">100+</h2>
                        <p>AI Challenges hosted</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
