import React from "react";

import { Button } from 'react-bootstrap/Button';

export function PendingCreation(props) {
    async function createHabit() {
        localStorage.getItem('userHabits')
    }

    return (
        <main>
      <div className="players">
        Enter below which daily habit you'd like to consistently pursue:
      </div>

      <br />

      <form action="javascript:addHabit()">
        <label>Habit</label>
        <input type="text" id="habit" placeholder="Your action here"/>
        <button type="submit">Submit</button>
        <Button onClick={() => props.onCreate()}>Create</Button>
      </form>
    </main>
    );
}