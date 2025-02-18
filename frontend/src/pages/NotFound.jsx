import React from 'react';

/**
 * NotFound page component.
 * Displays a 404 error message when a route is not matched.
 */
const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
