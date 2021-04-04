import { useCollectionData } from 'react-firebase-hooks/firestore';
import Message from './Message/Message';
import firebase from "../../firebase-config";
import { useState } from 'react';

function ChatRoom(props) {
    const firestore = firebase.firestore();

    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [input, setInput] = useState('');

    const sendMessage = async (event) => {
        // prevents the default submit behaviour
        event.preventDefault();

        const auth = firebase.auth();

        const { uid, photoURL } = auth.currentUser;

        
        // sends messsage
        await messageRef.add({
            text: input,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        });
    }

    const inputHandler = (value) => {
        setInput(value);
    }

    return (
        <>
            {messages ? messages.map(message => <Message message={message} />) : <p>So empty here</p>}
            <form onSubmit={sendMessage}>
                <input placeholder="Type here" value={input} onChange={(event) => inputHandler(event.target.value)} />
                <button type="submit" >Send</button>
            </form>
        </>
    );
}


export default ChatRoom;