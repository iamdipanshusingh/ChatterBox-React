import classes from './ChatListComponent.module.scss';
import SearchComponent from './SearchComponent/SearchComponent';
import Divider from '@material-ui/core/Divider';
import ChatListData from './ChatListData/ChatListData';
import { useEffect, useState } from 'react';
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

    const selectChat = (chat) => {
        dispatch({
            type: actionTypes.SELECT_CHAT,
            selectedChat: chat
        });
    }

    let chatDataComponent = null;

    const auth = firebase.auth();
    const currentUser = auth.currentUser;

    const chats = useSelector(state => state.chats);
    if (chats && chats.length > 0) {
        chatDataComponent = chats.map(chat =>
            <div className={classes.ChatWrapper}>
                <ChatListData onClick={() => selectChat(chat)} user={chat.receiver } />
                <Divider variant='middle' />
            </div>
        );
    }

    const getUsers = async () => {
        const usersRef = firestore.collection('users');
        const snapshot = await usersRef.get();

        let users = [];
        snapshot.docs.map(doc => {
            const user = doc.data();

            /// the user won't be able to search themselves
            /// remove the uid check if this is to be allowed
            if (currentUser.uid !== user.uid && user.name.toLowerCase().includes(query)) {
                users.push(user);
            }
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

    return (
        <div className={classes.ChatListWrapper}>
            <SearchComponent onChange={(e) => inputHandler(e.target.value)} onSearch={searchUser} value={query} />
            <Divider variant='middle' />

            {chatDataComponent}
        </div>
    );
}

export default ChatListComponent;
