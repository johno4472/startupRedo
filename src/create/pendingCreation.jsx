import React from "react";

import Button from 'react-bootstrap/Button';
import './create.css'
import { Habit, getHabits } from '../habit.js'

export function PendingCreation(props) {
    const [habitName, setHabitName] = React.useState('');
    const [targetDays, setTargetDays] = React.useState('');
    const [score, setScore] = React.useState('')
      
      // Function to save the list of habits to localStorage
      async function saveHabits(habits) {
        await fetch('api/habits', {
          method: 'POST',
          headers: { 'content/type': 'application/json'},
          body: JSON.stringify(habits)
        });
      }
      
      // Function to add a new habit
      async function addHabit(endpoint) {
        let tempHabit = new Habit(habitName, new Date().toISOString().split('T')[0], targetDays, score);
        console.log(tempHabit);
        const response = await fetch(endpoint, {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({habit: tempHabit}),
        });
        if (response?.status === 200) {
          let myHabits = response.habits;
          props.onCreate();
        } else {
          console.log("Failed to post new habit")
        }
        //const habits = getHabits();
        //const newHabit = new Habit(habitName, new Date().toISOString().split('T')[0], targetDays, score);
        //habits.push(newHabit);
        //saveHabits(habits);
      }     

    return (
        <main>
      <div className="players">
        Enter below which daily habit you'd like to consistently pursue:
      </div>

      <br />
                
      <div className="habit-entry">
        <input type="text" id="habit" value={habitName} 
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Your action here"/>
        <input type="text" id="habit" value={targetDays} 
        onChange={(e) => setTargetDays(e.target.value)}
        placeholder="How many days in a row"/>
        <input type="text" id="habit" value={score} 
        onChange={(e) => setScore(e.target.value)}
        placeholder="Enter score less than target (Usually 0)"/>
        <br />
        <Button className="smaller-button" onClick={() => addHabit(`/api/habit`)}>Create</Button>
        </div>
    </main>
    );
}