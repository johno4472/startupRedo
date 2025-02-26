import React from "react";

import Button from 'react-bootstrap/Button';
import './create.css'

export function PendingCreation(props) {
    async function createHabit() {
        localStorage.getItem('userHabitList')
    }

    return (
        <main>
      <div className="players">
        Enter below which daily habit you'd like to consistently pursue:
      </div>

      <br />

      <div className="habit-entry">
        <input type="text" id="habit" placeholder="Your action here"/>
        <Button className="smaller-button" onClick={() => props.onCreate()}>Create</Button>
        </div>
    </main>
    );
}