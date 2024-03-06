import { useState } from "react";
import "../Login/Login.css";
import HalfPagedImage from "../HalfPagedImage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import GoogleIcon from '@mui/icons-material/Google';

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({ email: "", phone: "", password: "", conpassword: "", fname: "", lname: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleOnChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleGoogle = (e) => {
        e.preventDefault();
    }

    return (
        <div className='login-container'>
            <HalfPagedImage image={"img/signup-pic.jpeg"}/>
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