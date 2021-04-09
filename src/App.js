import './App.scss';
import firebase from './firebase-config';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoomContainer from './container/ChatRoomContainer/ChatRoomContainer';
import SignIn from './components/SignIn/SignIn';

function App() {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? <ChatRoomContainer /> : <SignIn auth={auth} />}
        </section>
      </header>
    </div>
  );
}

export default App;
