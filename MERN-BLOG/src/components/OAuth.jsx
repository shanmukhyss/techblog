import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc"; // Updated Google icon
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
  
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Response:", resultsFromGoogle);
  
      const user = resultsFromGoogle.user;
      console.log("User Display Name:", user.displayName);
      console.log("User Email:", user.email);
      console.log("User Photo URL:", user.photoURL);
      console.log("Provider Data:", user.providerData);
  
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          googlePhotoUrl: user.photoURL ,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };
  

  return (
    <button
      type="button"
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-5 py-3 rounded-md transition-all transform hover:scale-110 shadow-lg flex items-center justify-center gap-2"
      onClick={handleGoogleClick}
    >
      <FcGoogle className="w-6 h-6" /> {/* Updated Icon */}
      Continue with Google
    </button>
  );
}
