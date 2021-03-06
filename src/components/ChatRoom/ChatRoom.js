import firebase from "../../firebase-config";
import React, { useEffect, useState } from 'react';
import classes from "./ChatRoom.module.scss";
import sendImage from '../../assets/icons/send.png';
import MessageHeader from './Message/MessageHeader/MessageHeader';
import { useSelector, useDispatch } from 'react-redux';
import MessageContainer from './Message/MessageContainer/MessageContainer';
import { fetchChats, encryptMessage } from '../../utils/utils';

function ChatRoom(props) {
    const dispatch = useDispatch();

    /// firestore instance for fetching/posting the collection data
    const firestore = firebase.firestore();

    /// ref. to chats
    /// use this to fetch and create new chats
    const chatsRef = firestore.collection('chats');

    const [input, setInput] = useState('');

    const auth = firebase.auth();
    const user = auth.currentUser;
    const { uid, photoURL } = user;

    /// fetch chats once the ChatRoom is loaded
    useEffect(() => {
        fetchChats(dispatch);
    }, [dispatch]);

    let selectedChat = useSelector(state => state.selectedChat, (prev, next) => prev.selectedChat?.id !== next.selectedChat?.id);
    const messagesRef = chatsRef.doc(selectedChat?.id).collection('messages');

    /// send the message
    const sendMessage = async (event) => {
        // prevents the default submit behaviour
        event.preventDefault();

        const _input = input;
        setInput('');

        if (_input.trim() === '') return;

        const postChat = async () => {
            const encryptedText = encryptMessage(_input);
            const data = {
                text: encryptedText,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                chatId: selectedChat?.id,
            };

            await messagesRef.add(data);
        }

        postChat();
    }

    const inputHandler = (value) => {
        setInput(value);
    }

    const onSignOut = async () => {
        await auth.signOut();
    }
    
    const wrapperStyle = [classes.ChatContainerWrapper];

    if (!Object.keys(selectedChat).length) {
        wrapperStyle.push(classes.Grid);
    }
    
    return (
        <div className={wrapperStyle.join(' ')}>
            <MessageHeader onSignOut={onSignOut} user={selectedChat.receiver} />
            {Object.keys(selectedChat).length > 0 ?
                <React.Fragment>
                    <MessageContainer classes={classes.MessageContainer} uid={uid} chatId={selectedChat.id} />
                    <form className={classes.ChatForm} onSubmit={sendMessage}>
                        <input placeholder="Type here" value={input} onChange={(event) => inputHandler(event.target.value)} />
                        <img onClick={sendMessage} src={sendImage} alt="Send Button" />
                    </form>
                </React.Fragment> : <p>Start chatting with your loved ones</p>
            }
        </div>
    );
}


export default ChatRoom;