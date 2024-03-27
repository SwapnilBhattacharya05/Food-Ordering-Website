import React, { useContext } from 'react'
import "./AdminTopbar.css"
import { ColorModeContext, useMode, tokens } from '../theme.js'
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Box, IconButton, UseTheme } from "@mui/material"
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useTheme } from '@emotion/react'
import { useAppContext } from '../../../Context/AppContext.js'

const AdminTopbar = () => {
    const theme = useTheme();
    // ?Used to set the theme from the tokens in theme.js
    const colors = tokens(theme.palette.mode);
    const { mode, toggleMode } = useAppContext();

    // !Toggle different states for the color mode
    const colorMode = useContext(ColorModeContext);

    return (
        <>
            <Box display="flex"
                justifyContent="space-between"
                p={2}
                className="AdminTopbar"

            >

                {/* //! SEARCH BAR */}
                <Box display="flex"
                    backgroundColor={colors.primary[200]}
                    borderRadius="0.1875rem"
                >
                    {/* // ?ml represents margin left */}
                    <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                    <IconButton type='button' sx={{ p: 1 }}>
                        <SearchIcon className='AdminTopbar_icon_light' />
                    </IconButton>
                </Box>

                {/* //!ICONS */}
                <Box display={"flex"}>
                    <IconButton onClick={() => toggleMode()}>
                        {mode === 'light-mode' ? (
                            <DarkModeOutlinedIcon className='AdminTopbar_icon_light' />
                        ) : (
                            <LightModeOutlinedIcon />
                        )}

                    </IconButton>

                    <IconButton>
                        <NotificationsOutlinedIcon className='AdminTopbar_icon_light' />
                    </IconButton>

                    <IconButton>
                        <PersonOutlinedIcon className='AdminTopbar_icon_light' />

                    </IconButton>
                </Box >
            </Box>
        </>
    )
}
export default AdminTopbar;