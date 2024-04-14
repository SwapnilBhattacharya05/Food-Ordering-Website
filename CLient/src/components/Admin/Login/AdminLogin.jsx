import React, { useState } from 'react';
import './AdminLogin.css';
import toastMessage from '../../ToastMessage';
import { Box, Typography } from '@mui/material';


const AdminLogin = () => {
  const [admin, setAdmin] = useState({
    adminUserName: "",
    adminPassword: "",
  });

  const onValueChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    console.log(admin);
  }

  const authentication = (e) => {
    e.preventDefault();
    if (admin.adminUserName === process.env.REACT_APP_ADMIN_USERNAME && admin.adminPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
      toastMessage({ msg: 'Login successful', type: 'success' });
      setTimeout(() => {
        window.location.href = '/AdminDashboard';
      }, 1500);
    } else {
      toastMessage({ msg: 'Invalid credentials', type: 'error' });

    }
  };

  return (
    <div className="background-container">
      <div className="admin-login-container">
        <Typography variant="h3" className='admin-login-heading'>Admin</Typography>
        <Box className="admin-login-image-container container">
          <img
            src='./img/Admin-login-page-icon.png'
            height="190px"
            width="100%"
            id='admin-login-image'
          />
        </Box>
        <form className="admin-login-form">
          <input
            type="text"
            id='admin-login-username'
            placeholder="User ID"
            name="adminUserName"
            onChange={onValueChange}
          />
          <input
            type="password"
            id='admin-login-password'
            placeholder="Password"
            name="adminPassword"
            onChange={onValueChange}

          />
          <input
            className='container'
            id="admin-login-submit-button"
            onClick={authentication}
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

