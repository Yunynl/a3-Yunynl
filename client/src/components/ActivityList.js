// src/components/ActivityList.js
import React, { useEffect, useState } from 'react';

function ActivityList() {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/getActivities');
                const data = await response.json();

                if (response.ok) {
                    setActivities(data);
                    console.log('Fetched activities:', data);
                } else {
                    console.error('Error fetching activities:', data.message);
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
                setError('An error occurred while fetching activities.');
            }
        };

        fetchActivities();
    }, []);

    return (
        <div>
            <h2>Your Activity List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {activities.map((activity, index) => (
                    <li key={index}>
                        <strong>{activity.activityType}</strong>: {activity.details.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivityList;
