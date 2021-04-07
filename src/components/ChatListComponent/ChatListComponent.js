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
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);

    const firestore = firebase.firestore();

    useEffect(() => {
        const chatsRef = firestore.collection('chats');

        const chats = [];
        chatsRef.get().then(snapshot => snapshot.docs.map(doc => {
            const chat = doc.data();
            chats.push(chat);
        }));

        if (chats && chats.length > 0)
                setChats([...chats]);

            setUsers([]);
    }, []);


    const inputHandler = (value) => {
        setQuery(value);
    }

    const searchUser = async (event) => {
        event.preventDefault();

        await getUsers();
    }

    const selectUser = (user) => {
        dispatch({
            type: actionTypes.SET_SELECTED_USER,
            selectedUser: user
        });
    }

    let chatDataComponent = null;

    const currentUser = useSelector(state => state.currentUser);

    if ((users && users.length > 0) || (chats && chats.length > 0)) {
        if (chats && chats.length > 0)
            setUsers(chats.users);

        chatDataComponent = users.map(user =>
            <div key={user.id} className={classes.ChatWrapper}>
                <ChatListData onClick={() => selectUser(user)} user={user} />
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
        if (users)
            setUsers([...users]);

        setChats([]);
    }

    return (
        <div className={classes.ChatListWrapper}>
            <SearchComponent onChange={(e) => inputHandler(e.target.value)} onSearch={searchUser} />
            <Divider variant='middle' />

            {chatDataComponent}
        </div>
    );
}

export default ChatListComponent;
