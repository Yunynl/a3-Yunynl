// src/components/ActivityForm.js
import React, { useState } from 'react';

function ActivityForm({ onAddActivity }) {
    const [activityType, setActivityType] = useState('');
    const [details, setDetails] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!activityType || !details) {
            setError('Both activity type and details are required.');
            return;
        }

        const activityData = {
            activityType,
            details: { description: details },
        };

        try {
            const response = await fetch('/addActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData),
            });
            const data = await response.json();

            if (response.ok) {
                onAddActivity(data.activity); // Use the data returned from the server
                setActivityType('');
                setDetails('');
                setError('');
            } else {
                console.error('Error adding activity:', data.message);
                setError(data.message);
            }
        } catch (error) {
            console.error('Error adding activity:', error);
            setError('An error occurred while adding the activity.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Activity Type:
                <input
                    type="text"
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Details:
                <input
                    type="text"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Add Activity</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default ActivityForm;
