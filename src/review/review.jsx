import React from "react";
import { ProgressBar } from "react-bootstrap";
import './review.css'

import { Habit, getHabits } from '../habit';

export function Review() {
    const [habits, setHabits] = React.useState([]);
    
    React.useEffect(() => { 
        setHabits(getHabits());
    }, []);

    return (
        <div className='goal-review'>
            <h3 className="center">
                Habit Reports:
            </h3>
            <br/>
            {habits.length > 0 ? (
                habits.map((habit, index) => {
                    const progress = (habit.score / habit.target) * 100;

                    return (
                        <div className="center" key={index}>
                            <h4 className="center">{habit.habit}</h4>
                            <ProgressBar className="longer-bar" now={progress} />
                            <p className="center">{habit.score} out of {habit.target} days!</p>             
                        </div>
                    );
                })
            ) : ( <p>No habits to display so far</p>

            )}
        </div>
    );
}