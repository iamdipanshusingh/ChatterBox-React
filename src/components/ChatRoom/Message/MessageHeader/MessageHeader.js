import classes from './MessageHeader.module.scss';
import React from "react";
import Avatar from '../../../UI/Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const messageHeader = props => {
    const { user, onSignOut } = props;

    return (
        <div className={classes.HeaderWrapper}>
            <div className={classes.IconWrapper}>
                <FontAwesomeIcon onClick={onSignOut} className={classes.SignOutBtn} icon={faSignOutAlt} />
            </div>
            {user && <React.Fragment>
                <Avatar avatar={user.photoURL} />
                <div className={classes.UserInfoDiv}>
                    <p>{user.name}</p>
                    <span>last seen</span>
                </div>
            </React.Fragment>}
        </div>
    );
}

export default messageHeader;
