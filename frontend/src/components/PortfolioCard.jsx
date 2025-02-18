import React from 'react';

/**
 * PortfolioCard component to display an individual portfolio item.
 * @param {string} title - Title of the portfolio.
 * @param {string} image - URL of the portfolio image.
 * @param {string} description - Description of the portfolio.
 */
const PortfolioCard = ({ title, image, description }) => {
    return (
        <div className="portfolio-card rounded-lg shadow-sm overflow-hidden">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
};

export default PortfolioCard;
