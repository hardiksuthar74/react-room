import { auth } from "../firebaseConfig";
import defaultProfile from "../assets/default.png";

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || defaultProfile} />
        <p>{text}</p>
      </div>
    </>
  );
};

export default ChatMessage;
