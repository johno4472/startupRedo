import React from "react";

import { getHabits, Habit } from '../habit.js';
import { Unreported } from './unreported';
import { Reported } from './reported';

export function Report() {
  const [habits, setHabits] = React.useState([]);

  React.useEffect(() => {
      setHabits(getHabits())
  }, []);

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

    return (
        <main>
      <div>
        Respond below whether or not you kept your individual habits today:
      </div>

      <br />
      <div id="habitReport"></div>

      <br />
      {habits.length > 0 ? (
                habits.map((habit, index) => {
                  const habitLastReported = 
                  habit.lastDayReported ? new Date(habit.lastDayReported).toISOString().split('T')[0] : null;
                    return (
                      <div key={index}>
                        { habitLastReported === todayString ? (
                          <Reported theHabit={habit}/>
                        ) : (
                          <Unreported theHabit={habit}/>
                        )}
                      </div>
                    );
                })
            ) : ( <p>No habits to display so far</p>

            )}

      <br />
    </main>
    );
}