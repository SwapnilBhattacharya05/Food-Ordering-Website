import React, { useState } from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material"
import AdminTopbar from '../Global/AdminTopbar'
import AdminSidebar from '../Global/AdminSidebar'
import AdminHeader from '../Global/AdminHeader';
import "./AdminMainGlobal.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens, useMode } from '../theme'
import { DataGrid, GridToolbarFilterButton, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';

const AdminMenu = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 90,
        },

        {
            field: "image",
            headerName: "Avatar",
            width: 100,
            cellClassName: "photo-column-cell",
            renderCell: (params) => <img src={params.value}
                alt="User images"
                id="admin-user-images"
                style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%"
                }}
            />,
        },

        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column-cell"
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
    ]
    const customToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </GridToolbarContainer>
        )
    }
    const customNoRowsOverlay = () => {
        return (
            <Stack height="100%"
                alignItems="center"
                justifyContent="center"
            >
                No Rows Available
            </Stack>
        )
    }



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
                        ml="15rem"
                        mt='4.324rem'
                    >

                        <Box
                            display="flex"
                            justifyContent='space-between'
                            alignItems='center'>

                            <AdminHeader title="MENU" subtitle="Check The Menu" />
                        </Box>

                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    )
}
export default AdminMenu;