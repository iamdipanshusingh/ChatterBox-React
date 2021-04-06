import classes from './ChatListComponent.module.scss';
import SearchComponent from './SearchComponent/SearchComponent';
import Divider from '@material-ui/core/Divider';
import ChatListData from './ChatListData/ChatListData';
import { useState } from 'react';
import firebase from '../../firebase-config';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../store/actions';

const ChatListComponent = props => {
    const dispatch = useDispatch();

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

    const selectUser = (user) => {
        dispatch({
            type: actionTypes.SET_SELECTED_USER,
            selectedUser: user
        });
    }

    if (users) {
        chatDataComponent = users.map(user =>
            <div key={user.name} className={classes.ChatWrapper}>
                <ChatListData onClick={() => selectUser(user)} user={user} />
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
