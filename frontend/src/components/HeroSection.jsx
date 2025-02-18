import React from 'react';

/**
 * HeroSection component for the home page.
 * Displays an engaging introduction with a call-to-action.
 * @param {string} image - URL of the background image.
 * @param {string} title - Title text for the section.
 * @param {string} description - Description text for the section.
 */
const HeroSection = ({ image, title, description }) => {
    return (
        <div className="hero-section" style={{ backgroundImage: `url(${image})` }}>
            <h1 className="text-white text-4xl font-bold">{title}</h1>
            <p className="text-white text-lg mt-4">{description}</p>
            <button className="mt-6 bg-primary text-white py-2 px-4 rounded">Get Started</button>
        </div>
    );
};

export default HeroSection;
