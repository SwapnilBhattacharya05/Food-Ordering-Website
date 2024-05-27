import React, { useState, useEffect } from 'react'
import { CssBaseline, Box, ThemeProvider, TextField, Button, styled, Stack, Select, MenuItem } from '@mui/material'
import AdminTopbar from '../Global/AdminTopbar'
import AdminSidebar from '../Global/AdminSidebar'
import { ColorModeContext, useMode, tokens } from '../theme'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import AdminHeader from '../Global/AdminHeader';
import "./AdminMainGlobal.css";



const AdminRestaurant = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const [restaurant, setRestaurant] = useState([]);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/getallRestaurants`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            const gettingRestaurants = data.restaurants.map(restaurant => ({
                ...restaurant,
                _id: restaurant?._id || "N/A",
                name: restaurant?.name || "N/A",
                imgUrls: restaurant?.imgUrls[0] || "N/A",
                state: restaurant?.state || "N/A",
                city: restaurant?.city || "N/A",
                email: restaurant?.email || "N/A",
                phone: restaurant?.phone || "N/A",
                itemCount: restaurant?.foodItems.length || "N/A",

            }));
            setRestaurant(gettingRestaurants);
            console.log(gettingRestaurants);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchRestaurants();
    }, [])


    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 90,
        },

        {
            field: "imgUrls",
            headerName: "Image",
            width: 100,
            cellClassName: "photo-column-cell",
            renderCell: (params) => <img src={params.value}
                alt="User images"
                id="admin-user-images"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />,
        },

        {
            field: "name",
            headerName: "Restaurant",
            flex: 1,
            cellClassName: "name-column-cell"
        },
        {
            field: "itemCount",
            headerName: "Food Count",
            flex: 1,
        },
        {
            field: "state",
            headerName: "State",
            flex: 1,
        },
        {
            field: "city",
            headerName: "City",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email ID",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Contact Info",
            flex: 1,
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

                            <AdminHeader title="RESTAURANTS" subtitle="Check Restaurants Here" />
                        </Box>
                        <Box ml="1.3rem">
                            <DataGrid

                                sx={{
                                    border: "none",
                                    // ?change the style of the entire table
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                    },
                                    "& .MuiButtonBase-root": {
                                        color: "#7c7676 !important",
                                    },
                                    // ?change the style of the cells/rows in the table
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "1px solid #9d9999",
                                    },
                                    // ?change the style of the headers of the table
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "#525352",
                                    },
                                    ".dark-mode & .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "#525352",
                                    },
                                    // ?change style of the content in the table 
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: "white",
                                        color: "black"
                                    },
                                    ".dark-mode & .MuiDataGrid-virtualScroller": {
                                        backgroundColor: "#979797",
                                        color: "white"
                                    },
                                    // ?change style of the footer of the table
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: "#525352",
                                    },
                                    ".dark-mode & .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: "#525352",
                                    },
                                    // ?change color of the checkmark in checkbox on click
                                    "& .Mui-checked": {
                                        color: `${colors.greenAccent[500]} !important`,
                                    },
                                    // ?change the style of the toolbar above the table
                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                        color: "#3da58a !important",
                                    },
                                }}
                                getRowId={(row) => row._id}
                                rows={restaurant}
                                columns={columns}
                                slots={{
                                    toolbar: customToolbar,
                                    noRowsOverlay: customNoRowsOverlay
                                }}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 6,
                                        },
                                    },
                                }}
                                pageSizeOptions={[6]}

                                // ?checkboxes
                                checkboxSelection

                                // ?to disable selection of rows on mouse click anywhere on the table
                                disableRowSelectionOnClick

                            />
                        </Box>
                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    )
}
export default AdminRestaurant;