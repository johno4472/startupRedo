import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState(''); 
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        console.log("LoginUser Function")
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        console.log("Fetching...");
        console.log("Username: ", userName, "password: ", password);
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({ userName: userName, password: password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        
        if (response?.status === 200) {
          localStorage.setItem('userName', response.body.userName);
          props.onLogin(userName);
        } else {
          console.log("Did nooooot verify");
          const body = await response.json();
          setDisplayError(`⚠ Error: ${body.msg}`);
        }
      }

    return (
        <>
            <div>
                <div>Login or create account to begin</div>
                <div className="make-column">
                    <input type="text" id="name" className="add-margin" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your name here" />
                    <input type="password" className="add-margin" onChange={(e) => setPassword(e.target.value)} placeholder="Password" name="password"/>
                    <div></div>
                </div> 
                <div className="space-between">
                <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
                    Login
                </Button>   
                <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
                    Create
                </Button>
                </div>
            </div>
            {/* This is a comment in JSX 
            {console.log("Display error: ", displayError)}
            
                <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />*/}
            
        </>
    );
}