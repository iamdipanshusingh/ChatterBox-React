import firebase from '../../firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Message from './Message/Message';

function ChatRoom(props) {
    const firestore = firebase.firestore();

    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    return (
        <>
            {messages ? messages.map(message => <Message message={message} />) : <p>So empty here</p>}
        </>
    );
}


export default ChatRoom;