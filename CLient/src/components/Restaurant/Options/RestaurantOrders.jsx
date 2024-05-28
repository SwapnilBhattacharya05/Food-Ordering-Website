import React, { useEffect, useState } from 'react'
import { ColorModeContext, tokens, useMode } from '../../Admin/theme';
import { CssBaseline, Box, ThemeProvider, TextField, Button, styled, Stack, Select, MenuItem } from '@mui/material'
import RestaurantTopbar from '../RestaurantTopbar';
import RestaurantSidebar from '../RestaurantSidebar';
import AdminHeader from '../../Admin/Global/AdminHeader';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { mockFavourites } from '../../../data/MockData';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import OutdoorGrillOutlinedIcon from '@mui/icons-material/OutdoorGrillOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useRestaurantContext } from '../../../Context/RestaurantContext';

const RestaurantOrders = () => {

  const {
    allOrders,
    fetchAllOrders,
  } = useRestaurantContext()

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState(allOrders)
  const [rows, setRows] = useState([])

  const restaurantId = sessionStorage.getItem("restaurantId");

  const handleChange = (id, newValue) => {
    setRows(rows.map(row => (row.id === id ? { ...row, progress: newValue } : row)));
  };

  useEffect(() => {
    if (restaurantId) {
      fetchAllOrders()
    }
  }, [])

  useEffect(() => {
    if (restaurantId && allOrders.length) {
      const filteredOrders = allOrders.filter((order) => order.restaurant._id === restaurantId).map(order => ({
        ...order,
        firstName: order.user?.firstName || 'N/A',
        foodItem: order?.foodItems.map(item => item.name).join(', ') || 'N/A',
        itemCount: order?.foodItems.length || 'N/A',
        totalAmount: order?.totalAmount || 'N/A',
      }));
      setOrders(filteredOrders);
      console.log(orders);

    }
  }, [allOrders]);




  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "firstName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell"
    },
    {
      field: "foodItem",
      headerName: "Food Items",
      flex: 1,
    },
    {
      field: "itemCount",
      headerName: "Number of Items",
      flex: 1,
    },
    {
      field: "totalAmount",
      headerName: "Total (₹)",
      flex: 1,
    },
    {
      field: "progress",
      headerName: "Progress",
      flex: 1,

      cellClassName: "progress-column-cell",

      renderCell: ({ row }) => (

        <Box
          width="100%"
          m="0 auto"
          p="2px"
          display="flex"
          borderRadius="4px"
        >

          {/* //?Adds a progress bar to every row in the table */}
          <Select
            value={row.progress}
            onChange={(e) => handleChange(row.id, e.target.value)}
            label="Progress"
            defaultValue="pending"
            sx={{
              "& .MuiSelect-select": {
                color: `${colors.grey[900]}`,
              },
              "& .dark-mode .MuiSelect-select": {
                color: "#fff !important",
              },
              "& .MuiSvgIcon-root": {
                color: "#000 !important",
              },
              width: "100%",
              color: "inherit"
            }}

          >
            <MenuItem value={'pending'}
              sx={{
                color: `${colors.redAccent[500]}`,
                display: 'flex',
                gap: 2
              }}
            >
              <AccessTimeOutlinedIcon /> Pending
            </MenuItem>
            <MenuItem value={'confirmed'}
              sx={{
                color: `${colors.greenAccent[500]}`,
                display: 'flex',
                gap: 2
              }}
            >
              <DoneOutlinedIcon /> Confirmed
            </MenuItem>
            <MenuItem value={'preparing'}
              sx={{
                color: "#FFDA78",
                display: 'flex',
                gap: 2
              }}
            >
              <OutdoorGrillOutlinedIcon />  Preparing
            </MenuItem>
            <MenuItem value={'ready_for_pickup'}
              sx={{
                color: "#FEAE6F",
                display: 'flex',
                gap: 2
              }}
            >
              <MopedOutlinedIcon /> Ready For Pickup
            </MenuItem>
            <MenuItem value={'out_for_delivery'}
              sx={{
                color: "#FEAE6F",
                display: 'flex',
                gap: 2
              }}
            >
              <DirectionsBikeOutlinedIcon /> Out for Delivery
            </MenuItem>
            <MenuItem value={'delivered'}
              sx={{
                color: "#B0EBB4",
                display: 'flex',
                gap: 2
              }}
            >
              <DoneAllOutlinedIcon />  Delivered
            </MenuItem>
            <MenuItem value={'completed'}
              sx={{
                color: "#94FFD8",
                display: 'flex',
                gap: 2
              }}
            >
              <CheckCircleOutlineOutlinedIcon /> Completed
            </MenuItem>
          </Select>
        </Box >
      ),
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell: ({ row: { action } }) => (

    //     <Box
    //       width="40%"
    //       m="0 auto"
    //       p="2px"
    //       display="flex"
    //       justifyContent="center"
    //       borderRadius="4px"
    //     >

    //       {/* //?Adds a delete button to every row in the table */}
    //       <Button
    //         color="error"
    //         className="admin-user-table-action-button"
    //         id="admin-user-table-action-button">
    //         <DeleteIcon />Delete
    //       </Button>
    //     </Box>
    //   ),
    // },
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

export default RestaurantOrders