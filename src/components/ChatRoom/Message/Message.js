import classes from './Message.module.scss';
import { decryptMessage } from '../../../utils/utils';

function Message(props) {
    let styles = [classes.MessageDiv];

    if (props.sent) {
        styles = [...styles, classes.Sent].join(' ');
    }

    const message = decryptMessage(props.message.text);

    return (<div className={styles}>
        {message.trim() !== '' ? <p>{message.trim()}</p> : null}
    </div>);
}

export default Message;
