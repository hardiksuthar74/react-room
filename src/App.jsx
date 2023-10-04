import Auth from "./components/Auth";
import "./App.css";
import { useState, useRef } from "react";

import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputReference = useRef(null);

  const roomChangeHandler = () => {
    setRoom(roomInputReference.current.value);
  };

  const signOutUser = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="App">
        App
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <div>
          <Chat roomName={room} />
        </div>
      ) : (
        <div className="room">
          <label>Enter Room:</label>
          <input ref={roomInputReference} />
          <button onClick={roomChangeHandler}>Enter Chat</button>
        </div>
      )}

      <div>
        <button className="auth-button" onClick={signOutUser}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default App;
