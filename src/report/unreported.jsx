import React from 'react';
import Button from 'react-bootstrap/Button';
import { Habit, updateHabit } from '../habit.js';
import { Reported } from './reported';

export function Unreported(props) {
    const [reportVal, setReportVal] = React.useState('');
    const [isReported, setIsReported] = React.useState(false);
    const [currentHabit, setCurrentHabit] = React.useState(props.theHabit);

    function udpateReport() {
        if (reportVal.toLowerCase() === 'y') {
            setCurrentHabit(props.theHabit.reportToday());
            updateHabit(currentHabit);
            setIsReported(true);
        }
    }
    console.log(props.theHabit.habitName);

    return(
        <div>
            {!isReported ? (
                <div>
                <div>Did you do this habit: {props.theHabit.habit}? (y/n)</div>
                <input type="text" value={reportVal} placeholder="y/n" 
                onChange={(e) => setReportVal(e.target.value)}/>
                <Button onClick={() => udpateReport()}>Submit</Button>
                </div>
            ) : (
                <Reported theHabit={currentHabit} />
            )}
        </div>
    );
}