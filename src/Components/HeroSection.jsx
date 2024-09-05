import React from 'react';
import Rocket from "../assets/icons/PicsArt_04-14-04.42 1.svg";

const HeroSection = () => {
    return (
        <section className="bg-[#003145] text-white py-10 sm:py-20 px-16 flex flex-col sm:flex-row justify-center items-center">
            <div className="w-full sm:w-full flex flex-col md:items-start space-y-8">
                <div className="flex items-center md:space-x-4">
                    <div className="bg-green-500 hidded md:block md:h-20 w-2"></div>
                    <h1 className="text-2xl sm:text-4xl font-bold">
                        Accelerate Innovation with Global AI Challenges
                    </h1>
                </div>
                <p className="max-w-xl mb-8">
                    AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to the test on diverse datasets allowing you to foster learning through competitions.
                </p>
                {
                    JSON.parse(localStorage.getItem("user"))?.role === "ADMIN" && (
                        <a href="/create-hackathon" className="bg-white text-blue-900 font-semibold py-2 px-4 rounded w-fit">
                            Create Challenge
                        </a>
                    )
                }
            </div>
            <div className="w-full md:flex md:justify-center hidden">
                <img src={Rocket} alt="Rocket" className="h-60 w-auto" />
            </div>
        </section>
    );
};

export default HeroSection;
