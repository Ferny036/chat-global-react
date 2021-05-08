import { useState, SyntheticEvent } from 'react'
import { useUser } from '../context/User';
import {firebase, firestore} from '../services/Firebase'
import {useCollectionData} from 'react-firebase-hooks/firestore'

interface IMessage{
    id: string,
    text: string,
    uid: string,
    photoURL: string,
    displayName: string,
    createdAt: firebase.firestore.Timestamp,
}

const messagesRef = firestore.collection("messages");
const messagesQuery = messagesRef.orderBy("createdAt","desc").limit(100);
export const Channel = () => {
    
    const [text, setText] = useState("");
    const {logout, user} = useUser();
    // const [messages, loading, error] = useCollectionData<IMessage>(messagesQuery, {idField: "id"});
    const [messages] = useCollectionData<IMessage>(messagesQuery, {idField: "id"});
    const sendMessage = (e: SyntheticEvent) => {
        e.preventDefault();
        if (user) {
            const {displayName, photoURL, uid} = user;
            messagesRef.add({
                text,
                uid,
                photoURL,
                displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        };
        setText('');
    };

    return (
        <section>
            <button onClick={logout}>Logout</button>
            <section>
                {messages && messages.map(m => (
                    <div key={m.id}>
                        [{m.displayName}]: {m.text}
                    </div>
                )).reverse()}
            </section>
                <form onSubmit={sendMessage}>
                    <input 
                        type="text"
                        value={text}
                        onChange={(e)=> setText(e.target.value)}
                    >
                    </input>
                    <button>Send</button>
                </form>
            
        </section>
    )
}
