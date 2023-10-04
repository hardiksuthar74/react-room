import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebaseConfig";
import ChatMessage from "./ChatMessage";

const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);
  const dummy = useRef(null);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
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
    const { uid, photoURL } = auth.currentUser;

    if (!newMessage) {
      return;
    }

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
      email: auth.currentUser.email,
      uid,
      photoURL,
    });

    setNewMessage("");
  };

  const scrollToDummy = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <main>
        <div className="dummy-space"></div>
        {allMessages &&
          allMessages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div className="dummy-space" ref={dummy}></div>
      </main>

      <form onSubmit={handleSubmit}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="say something nice"
        />

        <button onClick={scrollToDummy} type="submit" disabled={!newMessage}>
          🕊️
        </button>
      </form>
    </>
  );
};

export default Chat;
