import React from 'react';
import { fetchData } from '../utils/api';

/**
 * Profile page component.
 * Displays user profile information and portfolios.
 */
const Profile = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const data = await fetchData('users/me');
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUserProfile();
    }, []);

    return (
        <div className="profile-page">
            {loading ? (
                <p>Loading profile...</p>
            ) : (
                <div>
                    <h1>{user.username}'s Profile</h1>
                    <p>Email: {user.email}</p>
                    <h2>Portfolios</h2>
                    <div className="portfolio-list">
                        {user.portfolio.map(portfolio => (
                            <div key={portfolio.id}>{portfolio.title}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
