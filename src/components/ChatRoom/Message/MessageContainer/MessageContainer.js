import Message from '../Message';
import firebase from '../../../../firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const MessageContainer = props => {
    const { uid, classes, chatId } = props;

    const firestore = firebase.firestore();
    const chatsRef = firestore.collection('chats');
    const messagesRef = chatsRef.doc(chatId).collection('messages');

    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });

    return (
        <div className={classes}>
            {messages ? messages.map(message => <Message key={message.id} message={message} sent={uid === message.uid} />) : <p>Start the conversation!</p>}
        </div>
    );
}

export default MessageContainer;
