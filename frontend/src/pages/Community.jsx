import React from 'react';
import { fetchData } from '../utils/api';

/**
 * Community page component.
 * Displays a list of communities and trending posts.
 */
const Community = () => {
    const [communities, setCommunities] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadCommunities = async () => {
            try {
                const data = await fetchData('communities');
                setCommunities(data);
            } catch (error) {
                console.error('Error fetching communities:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCommunities();
    }, []);

    return (
        <div className="community-page">
            <h1>Communities</h1>
            {loading ? (
                <p>Loading communities...</p>
            ) : (
                <ul>
                    {communities.map(community => (
                        <li key={community.id}>{community.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Community;
