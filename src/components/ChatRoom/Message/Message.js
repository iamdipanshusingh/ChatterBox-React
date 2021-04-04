import classes from './Message.module.scss';

function Message(props) {
    let styles = [classes.MessageDiv];

    if (props.sent) {
        styles = [...styles, classes.Sent].join(' ');
    }

    return (<div className={styles}>
        {props.message.text.trim() !== '' ? <p>{props.message.text.trim()}</p> : null}
    </div>);
}

export default Message;
