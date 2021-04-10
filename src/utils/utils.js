import firebase from '../firebase-config';
import * as actionTypes from '../store/actions';
import CryptoJS from 'crypto-js';

/// fetch chats collection from firebase
export const fetchChats = async (dispatch, uid) => {
    const firestore = firebase.firestore();
    const chatsRef = firestore.collection('chats');
    const chatsSnapshot = await chatsRef.get();

    const auth = firebase.auth();
    const user = auth.currentUser;
    
    let chats = [];
    let receiverChatMap = {};
    chatsSnapshot.docs.map((doc) => {
        let chat = doc.data();

        const { users } = chat;

        const receiver = users.find(_user => _user.uid !== user.uid);
        chat = { ...chat, id: doc.id, receiver };

        receiverChatMap = {
            ...receiverChatMap,
            [receiver.uid]: chat
        };

        chats = [...chats, chat];
        return null;
    });

    if (chats.length) {
        dispatch({
            type: actionTypes.SET_CHATS,
            chats: chats
        });

        dispatch({
            type: actionTypes.SET_RECIEVER_CHAT_MAP,
            receiverChatMap: receiverChatMap
        });
    }
}

// Encrypt message
export const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, process.env.REACT_APP_EN_SECRET).toString();
}

// Decrypt message
export const decryptMessage = (message) => {
    var _message = CryptoJS.AES.decrypt(message, process.env.REACT_APP_EN_SECRET);

    const text = _message.toString(CryptoJS.enc.Utf8);

    return text;
}
