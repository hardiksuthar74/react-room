import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth, provider } from "../firebaseConfig";

const cookies = new Cookies();

const SignIn = (props) => {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result?.user?.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
};

export default SignIn;
