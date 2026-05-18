import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

function Login({ onSuccess, onError }) {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onSuccess?.(result.user);
    } catch (error) {
      console.log(error);
      onError?.(error);
    }
  };

  return (
    <button
      type="button"
      onClick={login}
      className="w-full rounded bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-200 transition-colors"
    >
      Login with Google
    </button>
  );
}

export default Login;
