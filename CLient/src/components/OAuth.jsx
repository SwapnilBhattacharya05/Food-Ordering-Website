import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from '../firebase';
import toastMessage from "./ToastMessage";
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom';
const OAuth = () => {

    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const handleGoogle = async (e) => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const { displayName, email, photoURL } = result.user;
            const firstName = displayName.split(" ")[0];
            const lastName = displayName.split(" ")[1];
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    photo: photoURL
                })
            });

            const data = await response.json();

            if (!data.success) {
                return toastMessage({ msg: data.message || data.error, type: "error" });
            }

            // Validate token before storing
            if (!data.authToken || typeof data.authToken !== 'string') {
                return toastMessage({ msg: "Authentication failed. Please try again.", type: "error" });
            }

            toastMessage({ msg: "Welcome Back to foodzie", type: "success" });
            localStorage.setItem("token", data.authToken);
            setUser(data.user);
            setTimeout(() => {
                navigate("/");
            }, 3700);
        } catch (error) {
            console.log("Could not sign in with google", error);
        }
    }
    return (
        <button onClick={handleGoogle} className="btn mt-2" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><GoogleIcon />&nbsp; Continue with Google</button>
    )
}

export default OAuth