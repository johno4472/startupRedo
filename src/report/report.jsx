import React from "react";

export function Report() {
    return (
        <main>
      <div>
        Respond below whether or not you kept your individual habits today:
      </div>

      <br />
      <div id="habitReport"></div>

      <br />

      <div>
        <input type="button" onclick="location.href='review.html';" value="Submit"/>
      </div>

      <br />
    </main>
    );
}