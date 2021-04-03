import React from 'react';
import firebase from 'firebase/app';

function SignIn(props) {
    const onClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider);
    }

    return (<>
        <button onClick={onClick}>Sign in with Google</button>
    </>);
}

export default SignIn;