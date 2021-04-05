import classes from './MessageHeader.module.scss';
import Avatar from '../../../UI/Avatar/Avatar';

const messageHeader = props => {
    const { user } = props;

    return (
        <div className={classes.HeaderWrapper}>
            <Avatar avatar={user.photoURL} />
            <div className={classes.UserInfoDiv}>
                <p>{user.displayName}</p>
                <span>last seen</span>
            </div>
        </div>
    );
}

export default messageHeader;