import { useState } from "react";
import "../Login/Login.css";
import HalfPagedImage from "../HalfPagedImage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import GoogleIcon from '@mui/icons-material/Google';
import toastMessage from "../ToastMessage";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({ email: "", phone: "", password: "", conpassword: "", fname: "", lname: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.conpassword) {
            return toastMessage({ msg: "Passwords do not match", type: "error" });
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
            return toastMessage({ msg: "Invalid Email", type: "error" });
        }

        if (userData.phone.length !== 10) {
            return toastMessage({ msg: "Invalid Phone Number", type: "error" });
        }

        if (userData.password.length < 8) {
            return toastMessage({ msg: "Password must be at least 8 characters long", type: "error" });
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname: userData.fname.slice(0, 1).toUpperCase() + userData.fname.slice(1).toLowerCase(),
                lname: userData.lname.slice(0, 1).toUpperCase() + userData.lname.slice(1).toLowerCase(),
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
            })
        });

        const data = await response.json();
        if (!data.success) {
            return toastMessage({ msg: data.error, type: "error" });
        }

        toastMessage({ msg: data.message, type: "success" });
        setTimeout(() => {
            navigate("/login");
        }, 3700);
    }

    const handleOnChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleGoogle = (e) => {
        e.preventDefault();
    }

    return (
        <div className='login-container'>
            <HalfPagedImage image={"img/signup-pic.jpeg"} />
            <div className="login-form-container container">
                <form className="login-form" onSubmit={handleSubmit} method="POST`">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="login-heading">Create Your Account</h1>
                        <PersonIcon className="signup-profile-icon" fontSize="large" />
                    </div>
                    <p>Please complete your account details</p>
                    <div className="form-name-label-grp">
                        <label className='label-tag' htmlFor="fname">First Name</label>
                        <label className='label-tag' htmlFor="lname">Last Name</label>
                    </div>
                    <div className="form-name-input-grp">
                        <input value={userData.fname}
                            onChange={handleOnChange}
                            type="text" name="fname"
                            id="fname" required />
                        <input value={userData.lname}
                            onChange={handleOnChange}
                            type="text" name="lname"
                            id="lname" required />
                    </div>

                    <label className='label-tag' htmlFor="email">Email</label>
                    <br />
                    <input value={userData.email}
                        onChange={handleOnChange}
                        type="email" name="email" placeholder="you@gmail.com"
                        id="email" required />
                    <br />
                    <label className='label-tag' htmlFor="phone">Phone Number</label>
                    <br />
                    <input value={userData.phone}
                        className="login-phone-input"
                        onChange={handleOnChange}
                        type="text" name="phone" placeholder="+91 XXXXXXXXXX"
                        id="phone" required
                        style={{
                            backgroundColor: "rgb(136, 133, 133)",
                            borderRadius: "5px",
                            border: "1px solid black",
                            outline: "none",
                            width: "100%",
                            padding: "0.5rem"
                        }}
                    />
                    <br />
                    <label className='label-tag' htmlFor="password">Your Password</label>
                    <br />
                    <div className="login-password-div">
                        <input value={userData.password}
                            onChange={handleOnChange}
                            type="password" name="password"
                            id="password" required />
                    </div>

                    <label className='label-tag' htmlFor="conpassword">Confirm Password</label>
                    <br />
                    <div className="login-password-div">
                        <input value={userData.conpassword}
                            onChange={handleOnChange}
                            type={showPassword ? "text" : "password"} name="conpassword"
                            id="conpassword" required />
                        {
                            showPassword ?
                                <VisibilityIcon onClick={() => setShowPassword(!showPassword)} className="eye-icon" /> :
                                <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} className="eye-icon" />
                        }
                    </div>
                    <input className="btn mt-4" type="submit" value="Submit" style={{ width: "100%" }} />
                    <button onClick={handleGoogle} className="btn mt-2" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><GoogleIcon />&nbsp; Continue with Google</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;