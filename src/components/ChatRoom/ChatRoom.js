import { useCollectionData } from 'react-firebase-hooks/firestore';
import Message from './Message/Message';
import firebase from "../../firebase-config";
import { useState } from 'react';
import classes from "./ChatRoom.module.scss";
import sendImage from '../../assets/icons/send.png';
import MessageHeader from './Message/MessageHeader/MessageHeader';
import { useSelector } from 'react-redux';

function ChatRoom(props) {
    const firestore = firebase.firestore();

    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [input, setInput] = useState('');

    const auth = firebase.auth();
    const user = auth.currentUser;
    const { uid, photoURL } = user;

    const sendMessage = async (event) => {
        // prevents the default submit behaviour
        event.preventDefault();

        const _input = input;
        setInput('');

        if (_input.trim() === '') return;

        // sends messsage
        await messageRef.add({
            text: _input,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        });
    }

    const inputHandler = (value) => {
        setInput(value);
    }

    let selectedUser = useSelector(state => state.selectedUser);

    return (
        <div className={classes.ChatContainerWrapper}>
            {Object.keys(selectedUser).length > 0 && <MessageHeader user={selectedUser} />}
            <div className={classes.MessageContainer}>
                {messages ? messages.map(message => <Message key={message.id} message={message} sent={uid === message.uid} />) : <p>So empty here</p>}
            </div>
            <form className={classes.ChatForm} onSubmit={sendMessage}>
                <input placeholder="Type here" value={input} onChange={(event) => inputHandler(event.target.value)} />
                <img onClick={sendMessage} src={sendImage} alt="Send Button" />
            </form>
        </div>
    );
}


export default ChatRoom;