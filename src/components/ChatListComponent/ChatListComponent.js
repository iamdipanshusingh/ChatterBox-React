import classes from './ChatListComponent.module.scss';
import SearchComponent from './SearchComponent/SearchComponent';
import Divider from '@material-ui/core/Divider';
import ChatListData from './ChatListData/ChatListData';
import { useState } from 'react';
import firebase from '../../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../store/actions';
import { fetchChats } from '../../utils/utils';

const ChatListComponent = props => {
    const dispatch = useDispatch();

    // states
    const [query, setQuery] = useState('');

    const firestore = firebase.firestore();

    const inputHandler = (value) => {
        setQuery(value);
        const interval = setTimeout(() => {
            if (value === '')
                fetchChats(dispatch);
            else
                getUsers();

            clearTimeout(interval);
        }, 1000);
    }

    const searchUser = async (event) => {
        event.preventDefault();

        await getUsers();
    }

    const auth = firebase.auth();
    const user = auth.currentUser;

    const receiverChatMap = useSelector(state => state.receiverChatMap);

    const selectChat = async (chat) => {
        if (chat.id) {
            chat = { ...chat, id: chat.id };

            dispatch({
                type: actionTypes.SELECT_CHAT,
                selectedChat: chat
            });
        } else {
            if (chat.receiver.uid in receiverChatMap) {
                const _chat = receiverChatMap[chat.receiver.uid];

                dispatch({
                    type: actionTypes.SELECT_CHAT,
                    selectedChat: _chat
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

    const onClear = () => {
        setQuery('');

        fetchChats(dispatch);
    }

    const chats = useSelector(state => state.chats, (prev, next) => prev.chats?.length !== next.chats?.length);
    return (
        <div className={classes.ChatListWrapper}>
            <SearchComponent onClear={onClear} onChange={(e) => inputHandler(e.target.value)} onSearch={searchUser} value={query} />
            <Divider variant='middle' />

            {chats.length > 0 ? chats.map(chat => {
                return (<div key={chat.id} className={classes.ChatWrapper}>
                    <ChatListData onClick={() => selectChat(chat)} user={chat.receiver} />
                    <Divider variant='middle' />
                </div>);
            }) : <p className="EmptyStateText">No chats or users found!</p>}
        </div>
    );
}

export default ChatListComponent;
