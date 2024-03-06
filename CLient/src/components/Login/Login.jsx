import { Link } from "react-router-dom";
import HalfPagedImage from "../HalfPagedImage";
import "./Login.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({ email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleOnChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleGoogle=(e)=>{
        e.preventDefault();;
    }

    return (
        <div className="login-container">
            <HalfPagedImage image={"img/login-pic.jpeg"} page={"login"}  />
            <div className="login-form-container container" style={{alignItems: "center"}}>
                <form className="login-form" onSubmit={handleSubmit} method="POST">
                    <Link to={"/"}>
                        <button className="login-back-btn mb-4">&gt;&nbsp;Back to Home</button>
                    </Link>
                    <h1 className="login-heading">Login to foodzie.com</h1>
                    <label className="label-tag" htmlFor="email">Email</label>
                    <br />
                    <input value={userData.email}
                        onChange={handleOnChange}
                        type="email" name="email" placeholder="you@gmail.com"
                        id="email" required />
                    <br />
                    <label className="label-tag" htmlFor="password">Your Password</label>
                    <br />
                    <div className="login-password-div">
                        <input value={userData.password}
                            onChange={handleOnChange}
                            type={showPassword ? "text" : "password"} name="password"
                            id="password" required />
                        {
                            showPassword ?
                                <VisibilityIcon onClick={() => setShowPassword(!showPassword)} className="eye-icon" /> :
                                <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} className="eye-icon" />
                        }
                    </div>
                    <input className="btn mt-4" type="submit" value="Login" style={{ width: "100%" }} />
                    <button onClick={handleGoogle} className="btn mt-2" style={{ width: "100%",display:"flex",justifyContent:"center",alignItems:"center" }}><GoogleIcon />&nbsp; Continue with Google</button>
                    <hr className="horizontal-line" />
                    <div className="login-footer">
                        <p>Don't have an account?</p>
                        <Link to={"/signup"}>
                            <button className="btn">Create an account</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login