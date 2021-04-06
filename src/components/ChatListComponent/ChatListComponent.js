import classes from './ChatListComponent.module.scss';
import SearchComponent from './SearchComponent/SearchComponent';
import Divider from '@material-ui/core/Divider';
import ChatListData from './ChatListData/ChatListData';
import { useEffect, useState } from 'react';
import firebase from '../../firebase-config';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../store/actions';

const ChatListComponent = props => {
    const dispatch = useDispatch();

    // states
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);

    const firestore = firebase.firestore();

    useEffect(async () => {
        const chatsRef = firestore.collection('chats');
        const snapshot = await chatsRef.get();

        const chats = [];
        snapshot.docs.map(doc => {
            const chat = doc.data();
            chats.push(chat);
        });

        setChats(chats);
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
    if (users || chats) {
        if (chats.length > 0)
            const { users } = chats;

        const currentUser = useSelector(state => state.currentUser);

        /// this is only valid for single type chats
        const recieverUser = users.find(user => user.uid !== currentUser.uid);

        chatDataComponent = chats.map(chat =>
            <div key={chat.id} className={classes.ChatWrapper}>
                <ChatListData onClick={() => selectUser(user)} user={recieverUser} />
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

            if (user.name.toLowerCase().includes(query)) {
                users.push(user);
            }
        });
        setUsers(users);
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
