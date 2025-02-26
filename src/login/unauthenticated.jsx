import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState('null');

    async function loginUser() {
        localStorage.setItem('username', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
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

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}