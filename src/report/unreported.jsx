import React from 'react';
import Button from 'react-bootstrap/Button';
import { updateHabit } from '../habit.js';
import { Reported } from './reported';

export function Unreported(props) {
    const [reportVal, setReportVal] = React.useState('');
    console.log("this here: ", props.theHabit.reportedToday);
    const [isReported, setIsReported] = React.useState(props.theHabit.reportedToday);
    const [currentHabit, setCurrentHabit] = React.useState(props.theHabit);

    function udpateReport() {
        if (reportVal.toLowerCase() === 'y') {
            const tempHabit = props.theHabit.updateScoreBy(1);
            setCurrentHabit(tempHabit.reportToday());
            updateHabit(currentHabit);
            setIsReported(true);
        } else if (reportVal.toLowerCase() === 'n') {
            const tempHabit = props.theHabit.updateScoreBy(-2);
            setCurrentHabit(tempHabit.reportToday());
            updateHabit(currentHabit);
            setIsReported(true);
        }
    }

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