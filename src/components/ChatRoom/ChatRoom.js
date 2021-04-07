import firebase from "../../firebase-config";
import React, { useEffect, useState } from 'react';
import classes from "./ChatRoom.module.scss";
import sendImage from '../../assets/icons/send.png';
import MessageHeader from './Message/MessageHeader/MessageHeader';
import { useDispatch, useSelector } from 'react-redux';
import MessageContainer from './Message/MessageContainer/MessageContainer';
import * as actionTypes from '../../store/actions';

function ChatRoom(props) {
    const dispatch = useDispatch();

    /// firestore instance for fetching/posting the collection data
    const firestore = firebase.firestore();

    /// ref. to chats
    /// use this to fetch and create new chats
    const chatsRef = firestore.collection('chats');

    let selectedChat = useSelector(state => state.selectedChat);

    const [input, setInput] = useState('');

    const auth = firebase.auth();
    const user = auth.currentUser;
    const { uid, photoURL } = user;

    /// fetch chats once the ChatRoom is loaded
    useEffect(() => {
        const fetchMessages = async () => {
            const messagesSnapshot = await chatsRef.doc('123123').collection('messages').get();

            const messages = [];
            messagesSnapshot.docs.map(doc => {
                const message = doc.data();
                messages.push(message);
                return null;
            });
            return messages;
        }

        /// fetch chats collection from firebase
        const fetchChats = async () => {
            const chatsSnapshot = await chatsRef.get();

            const chats = [];
            Promise.all(
                chatsSnapshot.docs.map(async (doc) => {
                    console.log({ doc });
                    let chat = doc.data();

                    const { users } = chat;

                    const messages = await fetchMessages();

                    const receiver = users.find(_user => _user.uid !== user.uid);
                    chat = { ...chat, receiver, messages };

                    chats.push(chat);
                })
            );
            return chats;
        }

        fetchChats().then(chats => {
            if (chats.length)
                dispatch({
                    type: actionTypes.SET_CHATS,
                    chats: chats
                });
        });
    }, [chatsRef, dispatch, user.uid]);

    /// send the message
    const sendMessage = async (event) => {
        // prevents the default submit behaviour
        event.preventDefault();

        const _input = input;
        setInput('');

        if (_input.trim() === '') return;

        await chatsRef.doc('123123').set({
            users: [
                selectedChat.receiver,
                {
                    uid: user.uid,
                    name: user.displayName,
                    phone: user.phoneNumber,
                    email: user.email,
                    photoURL: user.photoURL
                }
            ],
            type: 'single',
        });

        await chatsRef.doc('123123').collection('messages').doc().set({
            text: _input,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        });
    }

    const inputHandler = (value) => {
        setInput(value);
    }

    return (
        <div className={classes.ChatContainerWrapper}>
            {Object.keys(selectedChat).length > 0 &&
                <React.Fragment>
                    <MessageHeader user={selectedChat.receiver} />
                    <MessageContainer classes={classes.MessageContainer} messages={selectedChat.messages} uid={uid} />
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