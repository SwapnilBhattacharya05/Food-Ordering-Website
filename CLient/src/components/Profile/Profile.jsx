import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Profile.css"
import { tokens, useMode } from "../Admin/theme";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Divider from '@mui/material/Divider';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ProfileMain from "./Options/ProfileMain";



const Item = ({ title, icon, className, onClick }) => {
    return (
        <>


            {/* ICON */}
            <Box
                className={className}
                onClick={onClick}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                <Box
                    sx={{
                        marginRight: "10px",
                    }}
                >
                    {icon}
                </Box>

                {/* TITLE */}
                <Box>
                    <Typography
                        variant="h5"
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
            <Divider
                sx={{
                    margin: "20px 0",
                }}
            />
        </>
    )

}

const Profile = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const [selectedItem, setSelectedItem] = useState('Profile');

    const handleOptionClick = (title) => {
        setSelectedItem(title);
    }

    const renderRightContent = () => {
        switch (selectedItem) {
            case 'Profile':
                return (
                    <>
                        <Typography variant="h5">Profile Content</Typography>
                        <ProfileMain />
                    </>
                );
            case 'Favourites':
                return <Typography variant="h5">Favourite Content</Typography>;
            case 'Orders':
                return <Typography variant="h5">Orders Content</Typography>;
            case 'Coupons':
                return <Typography variant="h5">Coupons Content</Typography>;
            default:
                return null;
        }
    }

    return (
        <>
            <Navbar />

            <Box className="profile-container"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "2rem",
                    marginRight: "2rem",
                }}
            >
                <Box className="profile-left"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        flex: 1,
                        textAlign: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                        <img
                            src="https://www.pngitem.com/pimgs/m/150-150"
                            height="100"
                            width="100"
                            alt="profile"
                            style={{ borderRadius: "50%", border: "1px solid green" }}
                        />
                    </Box>
                    <Box className="profile-sidebar">
                        <Item
                            title="Profile"
                            icon={<PersonOutlineOutlinedIcon />}
                            className="profile-sidebar-item-profile"
                            onClick={() => handleOptionClick('Profile')}
                        />
                        <Item
                            title="Favourites"
                            icon={<FavoriteBorderOutlinedIcon />}
                            className="profile-sidebar-item-favourites"
                            onClick={() => handleOptionClick('Favourites')}
                        />
                        <Item
                            title="Orders"
                            icon={<FastfoodOutlinedIcon />}
                            className="profile-sidebar-item-orders"
                            onClick={() => handleOptionClick('Orders')}
                        />
                        <Item
                            title="Coupons"
                            icon={<ConfirmationNumberOutlinedIcon />}
                            className="profile-sidebar-item-coupons"
                            onClick={() => handleOptionClick('Coupons')}
                        />
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ marginBottom: "20px", padding: "10px 20px" }}
                            data-toggle="modal"
                            data-target="#exampleModal"
                        >
                            <ExitToAppIcon sx={{ marginRight: "10px" }} /> Logout
                        </Button>
                    </Box>
                </Box>
                <Box className="Profile-right"
                    sx={{
                        flex: 4,
                        textAlign: "center",
                        height: "100%",
                        width: "100%",
                        backgroundColor:colors.primary[400],
                    }}
                >
                    {renderRightContent()}
                </Box>
            </Box >
            <Footer />
            <div
                className="modal fade "
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content modal-dialog-logout">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Log Out?</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Typography variant="h5">Are you Sure You Are Not Hungry?</Typography>
                        </div>
                        <div className="modal-footer" style={{ justifyContent: "space-between" }}>
                            <Button variant="outlined" color="error" data-dismiss="modal">
                                Close
                            </Button>
                            <Button variant="outlined" color="success" onClick={() => { window.location.href = "/"; }}>
                                Yes
                            </Button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

export default Profile;