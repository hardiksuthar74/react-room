import { useState } from "react";
import Cookies from "universal-cookie";

import SignOut from "./components/SignOut";
import "./App.css";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  const [room, setRoom] = useState(null);

  const emptyRoom = () => {
    setRoom(null);
  };

  return (
    <div className="App">
      <header>
        {!room ? (
          <h1>💬</h1>
        ) : (
          <div className="d-flex">
            <button onClick={emptyRoom} className="back-button">
              {"<"}
            </button>
            <h1>{room}</h1>
          </div>
        )}
        <SignOut isAuth={isAuth} setIsAuth={setIsAuth} setRoom={setRoom} />
      </header>

      <section>
        {isAuth ? (
          <ChatRoom room={room} setRoom={setRoom} />
        ) : (
          <SignIn setIsAuth={setIsAuth} />
        )}
      </section>
    </div>
  );
};

export default App;
