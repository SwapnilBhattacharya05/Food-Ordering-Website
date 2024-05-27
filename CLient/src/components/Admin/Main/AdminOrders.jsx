import React, { useEffect, useState } from 'react'
import { CssBaseline, Box, ThemeProvider, TextField, Button, styled, Stack, Select, MenuItem } from '@mui/material'
import AdminTopbar from '../Global/AdminTopbar'
import AdminSidebar from '../Global/AdminSidebar'
import { ColorModeContext, tokens, useMode } from '../theme'
import AdminHeader from '../Global/AdminHeader';
import "./AdminMainGlobal.css";
import { DataGrid, GridToolbarFilterButton, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import { mockFavourites } from '../../../data/MockData';


const AdminOrders = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/getAllOrders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            const processedOrders = data.orders.map(order => ({
                ...order,
                _id: order?._id || 'N/A',
                firstName: order.user?.firstName || 'N/A',
                restaurantName: order.restaurant?.name || 'N/A',
                email: order.user?.email || 'N/A',
                totalAmount: order.totalAmount,
                orderStatus: order?.status || 'N/A',
                foodItemNames: order.foodItems.map(item => item.name).join(', ') || 'N/A',
                itemCount: order?.foodItems.length || 'N/A',
            }));
            setOrders(processedOrders);
            console.log(processedOrders);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])


    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 90,
        },

        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column-cell",
        },
        {
            field: "restaurantName",
            headerName: "Restaurant",
            flex: 1
        },
        {
            field: "foodItemNames",
            headerName: "Items",
            flex: 1
        },
        {
            field: "itemCount",
            headerName: "Number of Items",
            flex: 1
        },
        {
            field: "totalAmount",
            headerName: "Total Amount (₹)",
            flex: 1
        },
        {
            field: "orderStatus",
            headerName: "Order Status",
            flex: 1
        },
    ];
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

                            <AdminHeader title="ORDERS" subtitle="All Restaurant Orders" />
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
                                rows={orders}
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
export default AdminOrders;