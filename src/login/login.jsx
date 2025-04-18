import React from "react";

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from '../authState'

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
      </main>
    );
}