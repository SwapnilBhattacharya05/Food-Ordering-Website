import { CssBaseline, Box, ThemeProvider } from '@mui/material'
import React from 'react'
import { ColorModeContext, tokens, useMode } from '../../Admin/theme'
import RestaurantSidebar from '../RestaurantSidebar'
import RestaurantTopbar from '../RestaurantTopbar'
import AdminHeader from '../../Admin/Global/AdminHeader'

const RestaurantExtras = () => {
    const [theme, colorMode] = useMode()
    const colors = tokens(theme.palette.mode)
    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    {/* TOPBAR */}
                    <RestaurantTopbar />

                    {/* SIDEBAR */}
                    <RestaurantSidebar />

                    {/* CONTENT */}
                    <Box
                        ml="16rem"
                        mt='4.324rem'
                        mr='0.3125rem'
                    >
                        <Box
                            display="flex"
                            justifyContent='space-between'
                            alignItems='center'>

                            <AdminHeader title="MENU UPDATE"
                                subtitle="Add your Menus here"
                            />
                        </Box>
                        <Box ml="1.3rem">
                            <Box>
                                
                            </Box>
                        </Box>

                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider >
        </>
    )
}

export default RestaurantExtras
