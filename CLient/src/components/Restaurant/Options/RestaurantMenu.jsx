import React, { useEffect, useState } from 'react'
import { ColorModeContext, tokens, useMode } from '../../Admin/theme';
import { CssBaseline, Box, ThemeProvider, TextField, Button, styled, Stack, Select, MenuItem } from '@mui/material'
import RestaurantTopbar from '../RestaurantTopbar';
import RestaurantSidebar from '../RestaurantSidebar';
import AdminHeader from '../../Admin/Global/AdminHeader';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import OutdoorGrillOutlinedIcon from '@mui/icons-material/OutdoorGrillOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useRestaurantContext } from '../../../Context/RestaurantContext';

const RestaurantMenu = () => {

    const {
        allFoodItems,
        fetchAllFoodItems
    } = useRestaurantContext();

    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const [foodItems, setFoodItems] = useState([]);
    const [rows, setRows] = useState([]);



    const restaurantId = sessionStorage.getItem("restaurantId");

    const handleChange = (id, newValue) => {
        setRows(rows.map(row => (row.id === id ? { ...row, progress: newValue } : row)));
    };

    useEffect(() => {
        if (restaurantId) {
            fetchAllFoodItems();
        }
    }, []);

    useEffect(() => {
        if (restaurantId && Array.isArray(allFoodItems) && allFoodItems.length > 0) {
            const filteredOrders = allFoodItems
                .filter((item) => item.restaurant && item.restaurant._id === restaurantId)
                .map(item => ({
                    ...item,
                    img: item?.image || 'N/A',
                    name: item?.name || 'N/A',
                    price: item?.price || 'N/A',
                    category: item?.category || 'N/A',

                }));
            setFoodItems(filteredOrders);
        }
    }, [allFoodItems]);




    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "img",
            headerName: "Image",
            width: 100,
            cellClassName: "photo-column-cell",
            renderCell: (params) => <img src={params.value}
                alt="User images"
                id="admin-user-images"
                style={{
                    width: "80px",
                    height: "80px",
                }}
            />,
        },
        {
            field: "name",
            headerName: "Food Name",
            flex: 1,
            cellClassName: "name-column-cell"
        },
        {
            field: "price",
            headerName: "Price (₹)",
            flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            cellClassName: (params) => (params.value === "Veg" ? "veg-category" : "non-veg-category")
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

                            <AdminHeader title="ORDER UPDATE"
                                subtitle="Check The Order List"
                            />
                        </Box>
                        <Box ml="1.3rem">
                            <DataGrid

                                sx={{
                                    border: "none",
                                    // ?change the style of the entire table
                                    "& .MuiDataGrid-root": {
                                        border: "none",
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
                                rows={foodItems}
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

export default RestaurantMenu