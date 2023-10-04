import Cookies from "universal-cookie";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const cookies = new Cookies();

const SignOut = (props) => {
  const { isAuth, setIsAuth, setRoom } = props;

  const signOutUser = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };
  return (
    isAuth && (
      <button className="sign-out" onClick={signOutUser}>
        Sign Out
      </button>
    )
  );
};

export default SignOut;
