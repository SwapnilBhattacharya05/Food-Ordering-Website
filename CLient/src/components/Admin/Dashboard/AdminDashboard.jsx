import React from 'react'
import '../Global/AdminScrollbar.css'
import { ColorModeContext, useMode } from '../theme'
import { CssBaseline, ThemeProvider } from "@mui/material"
import AdminTopbar from '../Global/AdminTopbar'
import AdminSidebar from '../Global/AdminSidebar'



const AdminDashboard = () => {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <AdminTopbar />
            <AdminSidebar />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}
export default AdminDashboard;