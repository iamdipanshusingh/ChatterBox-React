import classes from './Avatar.module.scss';

const avatar = props => {
    return (
        <div className={classes.AvatarWrapper}>
            <img src={props.avatar} alt="User's Avatar"/>
        </div>
    );
}

export default avatar;