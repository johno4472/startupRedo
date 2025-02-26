import React from "react";

import './habit.js';

import { getHabits } from './habit';
import Button from 'react-bootstrap/Button';

export function Created(props) {
    const [habitName, setHabitName] = React.useState('');
    
    React.useEffect(() => {
        const habits = getHabits();
        if (habits.length > 0) {
            const lastHabit = habits[habits.length - 1];
            setHabitName(lastHabit.getHabitName()); // Set the name of the first habit
        }
    }, []);


    return (
        <div className="make-column">
            <div>Woohoo! You have successfully submitted the following habit:</div>
            <h2 className="fancy-habit">{habitName ? habitName : 'No Habit Found'}</h2>
            <Button className="add-button" onClick={() => props.onRefresh}>Add another habit</Button>
        </div>
    );
}