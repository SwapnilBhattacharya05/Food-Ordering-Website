import { useState } from 'react';
import toastMessage from '../ToastMessage';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RestaurantLogin = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const onValueChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const authentication = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const data = await response.json();
        if (!data.success) {
            return toastMessage({ msg: data.message, type: "error" });
        }

        sessionStorage.setItem("restaurantId", data.id);
        toastMessage({ msg: data.message, type: "success" });
        setTimeout(() => {
            navigate("/restaurant-dashboard");
        }, 4000);
    };

    return (
        <div className="background-container">
            <div className="admin-login-container">
                <Typography variant="h4" className='admin-login-heading'>Restaurant Login</Typography>
                <Box className="admin-login-image-container container">
                    <img
                        src='https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1715817600&semt=sph'
                        height="190px"
                        width="100%"
                        id='admin-login-image'
                        alt='admin-login'
                    />
                </Box>
                <form className="admin-login-form" onSubmit={authentication} method='POST'>
                    <input
                        type="email"
                        id='admin-login-username'
                        placeholder="Email"
                        name="email"
                        onChange={onValueChange}
                    />
                    <input
                        type="password"
                        id='admin-login-password'
                        placeholder="Password"
                        name="password"
                        onChange={onValueChange}
                    />
                    <input
                        className='container'
                        id="admin-login-submit-button"
                        type="submit"
                        value="Login"
                    />
                </form>
            </div>
        </div>
    );
};

export default RestaurantLogin;

