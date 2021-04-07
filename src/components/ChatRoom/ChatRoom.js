import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "../../firebase-config";
import React, { useEffect, useState } from 'react';
import classes from "./ChatRoom.module.scss";
import sendImage from '../../assets/icons/send.png';
import MessageHeader from './Message/MessageHeader/MessageHeader';
import { useSelector } from 'react-redux';
import MessageContainer from './Message/MessageContainer/MessageContainer';

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
            {Object.keys(selectedUser).length > 0 &&
                <React.Fragment>
                    <MessageHeader user={selectedUser} />
                    <MessageContainer classes={classes.MessageContainer} messages={messages} uid={uid} />
                    <form className={classes.ChatForm} onSubmit={sendMessage}>
                        <input placeholder="Type here" value={input} onChange={(event) => inputHandler(event.target.value)} />
                        <img onClick={sendMessage} src={sendImage} alt="Send Button" />
                    </form>
                </React.Fragment>
            }
        </div>
    );
}


export default ChatRoom;