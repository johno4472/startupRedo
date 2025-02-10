import React from "react";
import './about.css'

export function About() {
    return (
        <main className="main-about">
        <h4 className="add-spacing">Learn a little about how it all works!</h4>
        <h5 className="add-spacing">You will have 3 options for creating a habit:</h5>
        <div className="info-paragraph">
          1. Fast 
          <div className="line-of-text">Fasts are temporary, but 100% consistent until the end day</div>  
          <div className="line-of-text">(ex. I will fast from using Instagram until 30 days)</div>
        </div>
        <div className="info-paragraph">
          2. Blitz
          <div className="line-of-text">Blitz's are just the opposite of fasts, meaning we focus on doing one thing consistently until the end goal</div>
          <div className="line-of-text">(ex. for the next 14 days, I will run a mile every day, excluding Sunday)</div>
        </div>
        <div className="info-paragraph">
          3. Permanate
          <div className="line-of-text">Pick one new thing that you want to be a part of your life every day!</div>
          <div className="line-of-text">Be it big or small, the only requirement is that it's consistent!</div>
          <div className="line-of-text">(ex. I will make my bed every day)</div>
        </div>
        <div className="info-paragraph">
          <div id="picture" className="picture-box"></div>
          <img src="quote.jpg" alt="Consistency Quote" width="500"/>
        </div>
        <div className="info-paragraph">Here is your daily generated quote:
          <div className="line-of-text">
          “Keep it simple. It is in that simplicity that you will find the peace, 
          joy, and happiness that I have been talking about.”
          <div className="line-of-text">- M Russel Ballard</div>
          </div>
        </div>
        </main>    
    );
}