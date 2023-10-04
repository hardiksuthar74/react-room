import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;
  const signWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result?.user?.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <p>Sign In With Google To Continue</p>
      <button className="auth-button" onClick={signWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Auth;
