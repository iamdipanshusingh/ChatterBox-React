import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignIn from './components/SignIn/SignIn';

firebase.initializeApp({
  apiKey: "AIzaSyBSA7JB8q1ureglm9UFmkdyHO95pRQPtB0",
  authDomain: "chatein-cba56.firebaseapp.com",
  projectId: "chatein-cba56",
  storageBucket: "chatein-cba56.appspot.com",
  messagingSenderId: "187052287543",
  appId: "1:187052287543:web:28f4eb08191b5a051501b2",
  measurementId: "G-RC9B0GV6F6"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? <ChatRoom /> : <SignIn auth={auth} />}
        </section>
      </header>
    </div>
  );
}

export default App;
