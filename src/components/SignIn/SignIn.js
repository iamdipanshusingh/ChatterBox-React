import React from 'react';
import firebase from 'firebase/app';
import classes from './SignIn.module.scss';
import GoogleIcon from '../../assets/icons/search.png';

function SignIn(props) {
    const onClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider).then(response => {
            // create an instance of user
            // doing so, to find the users
            const firestore = firebase.firestore();
            const usersRef = firestore.collection('users');

            const user = response.user;
            const _user = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                photoURL: user.photoURL
            };

            usersRef.doc(user.email).set(_user);
        });
    }

    return (<div className={classes.WrapperClass}>
        <div className={classes.GoogleBtn} onClick={onClick}><img src={GoogleIcon}/> Sign in with Google</div>
    </div>);
}

export default SignIn;