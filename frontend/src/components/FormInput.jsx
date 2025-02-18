import React from 'react';

/**
 * FormInput component for standard input fields.
 * @param {string} type - Type of input (text, password, email).
 * @param {string} placeholder - Placeholder text for the input.
 * @param {function} onChange - Change handler for the input.
 */
const FormInput = ({ type, placeholder, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className="form-input"
        />
    );
};

export default FormInput;
