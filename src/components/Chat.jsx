import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const Chat = (props) => {
  const { roomName } = props;

  const [newMessage, setNewMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", roomName),
      orderBy("createdAt")
    );
    const unscribe = onSnapshot(queryMessages, (snapShot) => {
      let messages = [];
      snapShot.forEach((eachMessage) => {
        messages.push({ ...eachMessage.data(), id: eachMessage.id });
      });

      setAllMessages(messages);
    });

    return () => unscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage) {
      return;
    }

    const result = await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: roomName,
    });

    setNewMessage("");
  };

  const changeHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="chat-app">
      <h1>{roomName}</h1>
      <div>
        {allMessages.map((message, index) => {
          return (
            <div key={index}>
              <span>{message.user}: </span>
              {message.text}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          value={newMessage}
          onChange={changeHandler}
          className="new-message-input"
          placeholder="Message"
        />
        <button className="send-button" disabled={!newMessage}>
          {"Send>"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
