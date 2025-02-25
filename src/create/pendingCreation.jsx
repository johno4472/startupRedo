import React from './react';

export function PendingCreation() {
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
      </form>

      <br />

      <div>
        
      </div>
      <div>
        <button className="give-space" type="submit" onclick="loadHabits()">See Habits</button>
      </div>


      <ul id="habitReview"></ul>
      <br />
    </main>
    );
}