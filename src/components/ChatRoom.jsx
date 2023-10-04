import { useRef } from "react";
import Chat from "./Chat";

const ChatRoom = (props) => {
  const { room, setRoom } = props;
  const roomInputReference = useRef(null);

  const roomChangeHandler = () => {
    setRoom(roomInputReference.current.value);
  };

  return (
    <section>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <input placeholder="Enter Room" ref={roomInputReference} />
          <button className="room-enter" onClick={roomChangeHandler}>
            Enter Room
          </button>
        </div>
      )}
    </section>
  );
};

export default ChatRoom;
