import React from 'react'
import { Channel } from './components/Channel';
import {useUser} from './context/User'

export const AppChat = () => {
    const {user, login} = useUser();
    
    return (
        <div>
            <h1>App Chat</h1>
            {user ? <Channel/>: <button onClick={login}>Login with google</button>}
        </div>
    );
};
