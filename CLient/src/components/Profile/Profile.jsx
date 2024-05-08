import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Profile.css"
import { Box, Typography, Button, IconButton } from "@mui/material";
import { tokens, useMode } from "../Admin/theme";
import { ModuleFavourites, ListFavourites } from './Options/Favourites';
import { Link, useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Divider from '@mui/material/Divider';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import ProfileMain from "./Options/ProfileMain";
import Orders from "./Options/Orders";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useUserContext } from "../../Context/UserContext.js";


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
    const [selectedItem, setSelectedItem] = useState(sessionStorage.getItem("selectedItem") || "Profile");
    const [view, setView] = useState(sessionStorage.getItem("view") || "module");
    const { user } = useUserContext();

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    const navigate = useNavigate();
    // const userContext = useContext(useUserContext);
    // const { userData, setUserData, setUser } = userContext;
    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");

        navigate("/login")
        window.location.reload();
    }


    useEffect(() => {
        sessionStorage.setItem("selectedItem", selectedItem);
    }, [selectedItem]);

    const handleOptionClick = (title) => {
        setSelectedItem(title);
    }

    const renderRightContent = () => {
        switch (selectedItem) {
            case 'Profile':
                return (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            Your Details
                        </Typography>
                        <ProfileMain />
                    </>
                );

            case 'Favourites':
                return (
                    <>

                        <Typography
                            variant="h4"
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            Your Favourites
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "left",
                                textIndent: 70,
                                mt: 2,
                                height: 40,
                                width: "100%",
                                mb: 5,
                            }}
                        >
                            <Typography variant="h5">
                                You seem to enjoy these items:&nbsp;-
                            </Typography>
                            <Box
                                sx={{
                                    ml: 46.5,
                                }}
                            >
                                <ToggleButtonGroup
                                    orientation="horizontal"
                                    value={view}
                                    exclusive
                                    onChange={handleViewChange}
                                    aria-label="view"
                                >
                                    <ToggleButton value="module" aria-label="module">
                                        <ViewModuleIcon />
                                    </ToggleButton>

                                    <ToggleButton value="list" aria-label="list">
                                        <ViewListIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                        </Box>
                        {
                            view === 'module'
                                ?
                                <ModuleFavourites />
                                :
                                <ListFavourites />
                        }
                    </>
                );

            case 'Orders':
                return (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            History of Orders:&nbsp;-
                        </Typography>
                        <Orders />
                    </>
                );

            case 'Address':
                return (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            Your Addresses
                        </Typography>
                    </>
                );
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
                {/* PROFILE LEFT CONTENT */}
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                        }}
                    >
                        <Avatar
                            alt="profile"
                            src={user.image}
                            sx={{
                                height: 100,
                                width: 100,
                                borderRadius: "50%",
                                border: "2px solid" + colors.greenAccent[500],
                            }}
                        />
                    </Box>

                    {/* SIDEBAR */}
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
                            title="Address"
                            icon={<LocationOnOutlinedIcon />}
                            className="profile-sidebar-item-address"
                            onClick={() => handleOptionClick('Address')}
                        />
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{
                                marginBottom: "20px",
                                padding: "10px 20px"
                            }}
                            data-toggle="modal"
                            data-target="#exampleModal"
                        >
                            <ExitToAppIcon
                                sx={{
                                    marginRight: "10px"
                                }}
                            />
                            Logout
                        </Button>
                    </Box>
                </Box>

                {/* PROFILE RIGHT CONTENT */}
                <Box className="profile-right"
                    sx={{
                        flex: 4,
                        textAlign: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    {renderRightContent()}
                </Box>
            </Box>

            {/* FOOTER */}
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
                            <h5 className="modal-title"
                                id="exampleModalLabel"
                            >
                                Log Out?
                            </h5>
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
                            <Typography
                                variant="h5"
                            >
                                Are you Sure You Are Not Hungry?
                            </Typography>
                        </div>
                        <div className="modal-footer"
                            style={{
                                justifyContent: "space-between"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="error"
                                data-dismiss="modal"
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                onClick={() => { handleLogout() }}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Profile;