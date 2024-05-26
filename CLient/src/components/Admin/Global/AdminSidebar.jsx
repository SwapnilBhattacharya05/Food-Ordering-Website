import { React, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { tokens } from '../theme';
import "./AdminSidebar.css"
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
  return (
    <Link to={to}>
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  )
}


const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("Dashboard")
  return (
    <>
      <Sidebar collapsed={isCollapsed}

        style={{
          position: 'fixed',
          height: '100vh',
        }}

        className='AdminSidebar'>
        <Menu iconShape="square">

          {/* LOGO AND MENU ICON */}
          <MenuItem

            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <img src="../img/foodzie_logo.png" style={{ height: '5rem', width: '6.5rem' }} /> : undefined}

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
              to={"/AdminDashboard"}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            </Item>

            <Typography
              variant='h6'
              sx={{
                m: "10px 2px 20px 20px",
              }}
            >
              Users
            </Typography>

            <Item
              title="End Users"
              to={"/AdminUsers"}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            </Item>

            <Typography
              variant='h6'
              sx={{
                m: "10px 2px 20px 20px",
              }}
            >
              Main
            </Typography>

            <Item
              title="Orders"
              to={"/AdminOrders"}
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            </Item>

            <Item
              title="Menus"
              to={"/AdminMenu"}
              icon={<MenuBookOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            </Item>

            <Item
              title="Extras"
              to={"/AdminAddMenu"}
              icon={<AddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            </Item>

            <Item
              title="Restaurants"
              to={"/AdminRestaurants"}
              icon={<StorefrontOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            </Item>

            <Item
              title="Coupons"
              to={"/AdminCoupons"}
              icon={<CurrencyExchangeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            </Item>

            <Typography
              variant='h6'
              sx={{
                m: "10px 2px 20px 20px",
              }}
            >
              Other
            </Typography>

            <Item
              title="Sign Out"
              to={"/AdminLogin"}
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
export default AdminSidebar;