import React from 'react';
import firebase from 'firebase/app';

function SignIn(props) {
    const onClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider).then(response => {
            // create an instance of user
            // doing so, to find the users
            const firestore = firebase.firestore();
            const usersRef = firestore.collection('users');

            const user = response.user;
            usersRef.doc(user.email).set({
                name: user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                photoURL: user.photoURL
            })
        });
    }

    return (<>
        <button onClick={onClick}>Sign in with Google</button>
    </>);
}

export default SignIn;