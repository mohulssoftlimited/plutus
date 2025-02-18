import React from 'react';

/**
 * Button component for reusable button functionality.
 * @param {string} type - Type of button (primary or secondary).
 * @param {string} size - Size of the button (small, medium, large).
 * @param {function} onClick - Click handler for the button.
 * @param {string} children - Button label or content.
 */
const Button = ({ type = 'primary', size = 'medium', onClick, children }) => {
    const buttonClass = `btn ${type} ${size}`;
    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
