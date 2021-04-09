import Message from '../Message';

const MessageContainer = props => {
    const { messages, uid, classes } = props;

    console.log('message container', {props});
    
    return (
        <div className={classes}>
            {messages ? messages.map(message => <Message key={message.id} message={message} sent={uid === message.uid} />) : <p>Start the conversation!</p>}
        </div>
    );
}

export default MessageContainer;
