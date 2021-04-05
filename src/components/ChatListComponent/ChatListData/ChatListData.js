import classes from './ChatListData.module.scss';

const chatListData = props => {
    const {message} = props;

    return (
        <div className={classes.ChatWrapper}>
            <p className={classes.Title}>{message.name}</p>
            <p className={classes.Message}>{message.message}</p>
        </div>
    );
}

export default chatListData;
