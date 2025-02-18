import React from 'react';

/**
 * Modal component for displaying pop-up dialogs.
 * @param {string} title - Title of the modal.
 * @param {string} content - Content of the modal.
 * @param {function} onClose - Function to close the modal.
 */
const Modal = ({ title, content, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={onClose} className="bg-secondary text-white py-2 px-4 rounded">Close</button>
            </div>
        </div>
    );
};

export default Modal;
