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
import { WindowSharp } from "@mui/icons-material";



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
                <Box className="profile-left"
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
                            marginTop: "20px",
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
                                className="profile-sidebar-item-profile"
                            />
                            <Item
                                title="Favourites"
                                to={"/profile"}
                                icon={<FavoriteBorderOutlinedIcon />}
                                className="profile-sidebar-item-favourites"
                            />
                            <Item
                                title="Orders"
                                to={"/profile"}
                                icon={<FastfoodOutlinedIcon />}
                                className="profile-sidebar-item-orders"
                            />
                            <Item
                                title="Balance"
                                to={"/profile"}
                                icon={<CurrencyRupeeIcon />}
                                className="profile-sidebar-item-balance"
                            />
                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    marginBottom: "20px",
                                    padding: "10px 20px",
                                }}
                                data-toggle="modal"
                                data-target="#exampleModal"
                            >
                                <ExitToAppIcon
                                    sx={{
                                        marginRight: "10px",
                                    }}
                                />   Logout
                            </Button>
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

            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5
                                class="modal-title"
                                id="exampleModalLabel"
                            >
                                Modal title
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span
                                    aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Typography variant="h5">Are you Sure You Want To Logout?</Typography>
                        </div>
                        <div class="modal-footer" style={{
                            justifyContent: "space-between"
                        }}>
                            <Button
                                variant="outlined"
                                color="error"
                                data-dismiss="modal"
                            >
                                Close
                            </Button>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => {
                                    window.location.href = "/";
                                }}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Profile;