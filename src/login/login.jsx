import React from "react";

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './Authenticated';
import { AuthState } from './AuthState'

export function Login({ userName, authState, onAuthChange}) {
    return (
        <main>
        {authState !== AuthState.Unknown && <h2>Welcome!</h2>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated)
            }}
          />
        )}
        /*Code below not necessary*/
        <p>Login to begin</p>
        <form className="make-column" action="create.html" method="get">
          <input type="text" id="name" className="add-margin" placeholder="Your name here" />
          <input type="password" className="add-margin" placeholder="Password" name="password"/>
          <button type="submit" value="Login">Submit</button>
          </form>
      </main>
    );
}