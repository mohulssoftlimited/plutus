import React from 'react';
import { fetchData } from '../utils/api';

/**
 * Leaderboard page component.
 * Displays user rankings and achievements.
 */
const Leaderboard = () => {
    const [rankings, setRankings] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadRankings = async () => {
            try {
                const data = await fetchData('leaderboard');
                setRankings(data);
            } catch (error) {
                console.error('Error fetching rankings:', error);
            } finally {
                setLoading(false);
            }
        };
        loadRankings();
    }, []);

    return (
        <div className="leaderboard-page">
            <h1>Leaderboard</h1>
            {loading ? (
                <p>Loading rankings...</p>
            ) : (
                <ul>
                    {rankings.map(ranking => (
                        <li key={ranking.id}>{ranking.username}: {ranking.points} points</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Leaderboard;
