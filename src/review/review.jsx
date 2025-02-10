import React from "react";

export function Review() {
    return (
        <main>
            <div className="players">
                Reports of Successful Habits:
            </div>
            <br/>
                <div id="habitReview"></div>
                <label>Read 15 minutes every day</label>
            <br/>
        <li>
            <progress color="yellow" id="progress" max="21" value="4"></progress>
            <div>Progress: 4 out of 21 day(s)!</div>
        </li>
        <br/>
        </main>
    );
}