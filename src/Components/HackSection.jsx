import React from 'react';
import Robot from "../assets/icons/Robot.svg"
import Vector from "../assets/icons/Vector.svg"
import Group from "../assets/icons/carbon_notebook-reference.svg"
import IdentityCard from "../assets/icons/IdentificationCard.svg"

const HackSection = () => {
    const reasons = [
        {
            title: "Prove your skills",
            description: "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
            icon: Group,
        },
        {
            title: "Learn from community",
            description: "One can look and analyze the solutions submitted by other Data Scientists in the community and learn from them.",
            icon: Vector,
        },
        {
            title: "Challenge yourself",
            description: "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
            icon: Robot,
        },
        {
            title: "Earn recognition",
            description: "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
            icon: IdentityCard,
        },
    ];

    return (
        <section className="py-20 bg-white px-16">
            <h2 className="text-3xl font-bold text-center mb-10">Why Participate in <span className="text-green-600">AI Challenges?</span></h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {reasons.map((reason, index) => (
                    <div key={index} className="bg-[#F8F9FD] p-6 rounded-lg shadow-md text-start">
                        <img src={reason.icon} alt={reason.title} className="h-8 w-8" />
                        <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                        <p>{reason.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HackSection;
