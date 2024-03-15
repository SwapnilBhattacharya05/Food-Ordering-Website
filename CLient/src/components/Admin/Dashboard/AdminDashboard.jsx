import React, { useState } from 'react'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material"
import AdminTopbar from '../Global/AdminTopbar'
import AdminSidebar from '../Global/AdminSidebar'
import { ColorModeContext, useMode } from '../theme'
import AdminHeader from '../Global/AdminHeader';
import "./AdminDashboard.css";


const AdminDashboard = () => {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* TOPBAR */}
          <AdminTopbar />

          {/* SIDEBAR */}
          <AdminSidebar />

          {/* CONTENT */}
          <Box
            m="5px 0 10px 5px"
            ml="15rem">

            <Box
              display="flex"
              justifyContent='space-between'
              alignItems='center'>

              <AdminHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>

          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}
export default AdminDashboard;