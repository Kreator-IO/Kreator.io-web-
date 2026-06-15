import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

function Login({ label = 'Login with Google', disabled = false, onSuccess, onError }) {
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
      disabled={disabled}
      className="w-full rounded bg-white px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}

export default Login;
