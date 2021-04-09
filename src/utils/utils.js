import firebase from '../firebase-config';

const firestore = firebase.firestore();

export const fetchMessages = async (id) => {
    const chatsRef = firestore.collection('chats');
    const messagesSnapshot = await chatsRef.doc(id).collection('messages').get();

    const messages = [];
    messagesSnapshot.docs.map(doc => {
        const message = doc.data();
        messages.push(message);
        return null;
    });
    return messages;
}