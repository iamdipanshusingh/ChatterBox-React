import './App.css';
import firebase from './firebase-config';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignIn from './components/SignIn/SignIn';

function App() {
  const auth = firebase.auth();
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
