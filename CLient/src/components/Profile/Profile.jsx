import { Box, Typography, Button, IconButton } from "@mui/material";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import { tokens, useMode } from "../Admin/theme";
import Avatar from '@mui/material/Avatar';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Divider from '@mui/material/Divider';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Item = ({ title, to, icon }) => {
    return (
        <>
            <Link to={to}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Box
                        sx={{
                            marginRight: "10px",
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="h5">{title}</Typography>
                    </Box>
                </Box>
            </Link>
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

    return (
        <>
            <Navbar />

            {/* PROFILE CONTAINER */}
            <Box className="profile-container container"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >

                {/* PROFILE LEFT */}
                <Box className="Profile-left"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        flex: 1,
                        textAlign: "center",
                    }}
                >

                    {/* AVATAR */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src="https://www.pngitem.com/pimgs/m/150-150"
                            height="100"
                            width="100"
                            alt="profile"
                            style={{
                                borderRadius: "50%",
                                border: "1px solid green",
                            }}
                        />
                    </Box>

                    {/* SIDEBAR PROFILE LEFT */}
                    <Box>
                        <Box
                            className="profile-sidebar"
                        >
                            {/* MENU */}
                            <Item
                                title="Profile"
                                to={"/profile"}
                                icon={<PersonOutlineOutlinedIcon />}
                            />
                            <Item
                                title="Favourites"
                                to={"/profile"}
                                icon={<FavoriteBorderOutlinedIcon />}
                            />
                            <Item
                                title="Orders"
                                to={"/profile"}
                                icon={<FastfoodOutlinedIcon />}
                            />
                            <Item
                                title="Balance"
                                to={"/profile"}
                                icon={<PersonOutlineOutlinedIcon />}
                            />
                            <Item
                                title="Profile"
                                to={"/profile"}
                                icon={<PersonOutlineOutlinedIcon />}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* PROFILE RIGHT */}
                <Box className="Profile-right"
                    sx={{
                        flex: 3,
                        textAlign: "center",
                        backgroundColor: colors.primary[300],

                    }}
                >
                    right

                </Box>
            </Box >
            <Footer />
        </>
    )
}

export default Profile;