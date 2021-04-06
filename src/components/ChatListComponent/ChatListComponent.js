import classes from './ChatListComponent.module.scss';
import SearchComponent from './SearchComponent/SearchComponent';
import Divider from '@material-ui/core/Divider';
import ChatListData from './ChatListData/ChatListData';
import { useState, useEffect } from 'react';
import firebase from '../../firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatListComponent = props => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);

    let chatDataComponent = null;

    const inputHandler = (value) => {
        setQuery(value);
    }

    const searchUser = async (event) => {
        event.preventDefault();

        await getUsers();
    }

    if (users) {
        chatDataComponent = users.map(user =>
            <div key={user.name} className={classes.ChatWrapper}>
                <ChatListData user={user} />
                <Divider variant='middle' />
            </div>
        );
    }

    const getUsers = async () => {
        const firestore = firebase.firestore();
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
