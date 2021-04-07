import React from 'react';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../store/actions';

function SignIn(props) {
    const dispatch = useDispatch();

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

            dispatch({
                type: actionTypes.SET_CURRENT_USER,
                currentUser: _user
            })

            usersRef.doc(user.email).set(_user)
        });
    }

    return (<>
        <button onClick={onClick}>Sign in with Google</button>
    </>);
}

export default SignIn;