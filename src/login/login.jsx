import React from "react";

export function Login() {
    return (
        <main>
        <h2>Welcome!</h2>
        <p>Login to begin</p>
        <form className="make-column" action="create.html" method="get">
          <input type="text" id="name" className="add-margin" placeholder="Your name here" />
          <input type="password" className="add-margin" placeholder="Password" name="password"/>
          <button type="submit" value="Login">Submit</button>
          </form>
      </main>
    );
}