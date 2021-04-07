import classes from './ChatListData.module.scss';
import Avatar from '../../UI/Avatar/Avatar';

const ChatListData = props => {
    const { user } = props;

    return (
        <div onClick={props.onClick} className={classes.OuterWrapper}>
            <Avatar avatar={user?.photoURL} />
            <div className={classes.ChatWrapper}>
                <p className={classes.Title}>{user?.name}</p>
                <p className={classes.Message}>last message</p>
            </div>
        </div>
    );
}

export default ChatListData;
