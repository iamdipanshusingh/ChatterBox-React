import classes from './ChatListComponent.module.scss';
import SearchComponent from './SearchComponent/SearchComponent';
import Divider from '@material-ui/core/Divider';
import ChatListData from './ChatListData/ChatListData';
import { useState } from 'react';
import firebase from '../../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../store/actions';

const ChatListComponent = props => {
    const dispatch = useDispatch();

    // states
    const [query, setQuery] = useState('');

    const firestore = firebase.firestore();

    const inputHandler = (value) => {
        setQuery(value);
    }

    const searchUser = async (event) => {
        event.preventDefault();

        await getUsers();
    }

    const auth = firebase.auth();
    const user = auth.currentUser;

    const selectChat = async (chat) => {
        console.log({ chat });

        if (chat.id) {
            chat = { ...chat, id: chat.id };

            dispatch({
                type: actionTypes.SELECT_CHAT,
                selectedChat: chat
            });
        } else {
            const chatsRef = firestore.collection('chats');
            await chatsRef.add({
                users: [
                    chat.receiver,
                    {
                        uid: user.uid,
                        name: user.displayName,
                        phone: user.phoneNumber,
                        email: user.email,
                        photoURL: user.photoURL
                    }
                ],
                type: 'single',
            }).then(response => {
                const _selectedChat = { ...chat, id: response.id }
                dispatch({
                    type: actionTypes.SELECT_CHAT,
                    selectedChat: _selectedChat
                });
            });
        }
    }

    const getUsers = async () => {
        const usersRef = firestore.collection('users');
        const snapshot = await usersRef.get();

        let users = [];
        snapshot.docs.map(doc => {
            const _user = doc.data();

            /// the user won't be able to search themselves
            /// remove the uid check if this is to be allowed
            if (user.uid !== _user.uid && _user.name.toLowerCase().includes(query)) {
                users.push(_user);
            }
            return null;
        });
        if (users) {
            const chats = users.map(user => {
                return {
                    receiver: user
                };
            });

            dispatch({
                type: actionTypes.SET_CHATS,
                chats: chats
            });
        }
    }

    const chats = useSelector(state => state.chats, (prev, next) => prev.chats?.length !== next.chats?.length);
    console.log('chat list component', { chats });
    return (
        <div className={classes.ChatListWrapper}>
            <SearchComponent onChange={(e) => inputHandler(e.target.value)} onSearch={searchUser} value={query} />
            <Divider variant='middle' />

            {chats.length > 0 && chats.map(chat => {
                return (<div key={chat.id} className={classes.ChatWrapper}>
                    <ChatListData onClick={() => selectChat(chat)} user={chat.receiver} />
                    <Divider variant='middle' />
                </div>);
            })}
        </div>
    );
}

export default ChatListComponent;
