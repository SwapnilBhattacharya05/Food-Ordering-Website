import { React, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import "./RestaurantSidebar.css"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Box, IconButton, Typography, useTheme } from "@mui/material";



const Item = ({ title, to, icon, selected, setSelected }) => {

    const navigate = useNavigate();
    const handler = (title) => {
        if (title === "Sign Out") {
            setSelected(title)
            sessionStorage.clear();
            navigate("/restaurant-login");
        } else {
            setSelected(title);
        }
    }

    return (
        <Link to={to}>
            <MenuItem
                active={selected === title}
                onClick={() => handler(title)}
                icon={icon}
            >
                <Typography>{title}</Typography>
            </MenuItem>
        </Link>
    )
}


const RestaurantSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")
    return (
        <>
            <Sidebar collapsed={isCollapsed}

                style={{
                    position: 'fixed',
                    height: '100vh',
                }}

                className='RestaurantSidebar'>
                <Menu iconShape="square">

                    {/* LOGO AND MENU ICON */}
                    <MenuItem

                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <img src="../img/foodzie_logo.png" style={{ height: '5rem', width: '6.5rem' }} alt='logo' /> : undefined}

                        style={{
                            margin: "10px 0 5px 0",

                        }}

                    >
                        {!isCollapsed && (

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >

                                <Typography variant="h3">
                                    FOODZIE
                                </Typography>

                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <img src="../img/foodzie_logo.png"
                                        alt="logo"
                                        style={{
                                            height: '3rem',
                                            width: '6.5rem'
                                        }}
                                    />
                                </IconButton>
                            </Box>

                        )}

                    </MenuItem>

                    <Box
                        pl={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to={"/restaurant-dashboard"}
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        >
                        </Item>

                        <Typography
                            variant='h6'
                            sx={{
                                m: "0 0 0 20px",
                                pt: 5,
                            }}
                        >
                            Main
                        </Typography>

                        <Item
                            title="Orders"
                            to={"/RestaurantOrders"}
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        >
                        </Item>

                        <Item
                            title="Menus"
                            to={"/RestaurantMenu"}
                            icon={<MenuBookOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        >
                        </Item>

                        <Item
                            title="Extras"
                            to={"/RestaurantAddMenu"}
                            icon={<AddOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        >
                        </Item>

                        {/* <Item
                            title="Coupons"
                            to={"/RestaurantCoupons"}
                            icon={<CurrencyExchangeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        >
                        </Item> */}

                        <Typography
                            variant='h6'
                            sx={{
                                m: "0 0 0 20px",
                                pt: 5,
                            }}
                        >
                            Other
                        </Typography>

                        <Item
                            title="Sign Out"
                            to={"/restaurant-login"}
                            icon={<ExitToAppOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        >
                        </Item>
                    </Box>
                </Menu>
            </Sidebar>
        </>
    )
}
export default RestaurantSidebar;