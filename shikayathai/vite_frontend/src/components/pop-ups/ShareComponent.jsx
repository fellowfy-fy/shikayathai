import React from 'react';

const ShareComponent = ({ stage, onClose }) => {
    const titles = ["Share your complaint with others in Facebook", "Share the link with the environment", "Share your complaint with others in LinkedIn"];
    const descriptions = [
        "Share your complaint on social networks, the more people see it, the more chances there are for its speedy resolution",
        "Share your complaint on social networks, the more people see it, the more chances there are for its speedy resolution",
        "Share your complaint on social networks, the more people see it, the more chances there are for its speedy resolution"
    ];
    const buttons = ["Facebook", "", "LinkedIn"]; // Assuming the second modal has no specific platform button

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">&times;</button>
                <div className="space-y-4">
                    <div className="progress-bar bg-blue-200 rounded-full" style={{ width: `${(stage / 3) * 100}%` }}></div>
                    <h2 className="text-lg font-bold">{titles[stage - 1]}</h2>
                    <p>{descriptions[stage - 1]}</p>
                    {buttons[stage - 1] && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{buttons[stage - 1]} Share</button>}
                    <button className="mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">Skip</button>
                </div>
            </div>
        </div>
    );
};

export default ShareComponent;