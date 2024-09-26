// src/App.js
import React, { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';

function App() {
    const [activities, setActivities] = useState([]);

    // Fetch activities from the server when the component mounts
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/getActivities');
                const data = await response.json();

                if (response.ok) {
                    setActivities(data);
                } else {
                    console.error('Error fetching activities:', data.message);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    // Add new activity to the state
    const addActivityToList = (newActivity) => {
        setActivities((prevActivities) => [...prevActivities, newActivity]);
    };

    return (
        <div>
            <h1>Activity Tracker</h1>
            <ActivityForm onAddActivity={addActivityToList} />
            <ActivityList activities={activities} />
        </div>
    );
}

export default App;
