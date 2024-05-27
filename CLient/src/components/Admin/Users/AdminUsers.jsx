import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography, useTheme, CssBaseline, ThemeProvider, Button, colors } from "@mui/material";
import AdminTopbar from '../Global/AdminTopbar'
import AdminSidebar from '../Global/AdminSidebar'
import { ColorModeContext, tokens, useMode } from '../theme'
import AdminHeader from '../Global/AdminHeader';
import "../Main/AdminMainGlobal.css";
import { DataGrid, GridToolbarFilterButton, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';




const AdminUsers = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getallusers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();
      console.log(data.users);
      setAllUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [allUsers.length]);

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
    {
      field: "action",
      headerName: "Action",
      flex: 1,

      renderCell: ({ row: { action } }) => (
        <Box
          width="40%"
          m="0 auto"
          p="2px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >

          {/* //?Adds a delete button to every row in the table */}
          <Button
            color="error"
            className="admin-user-table-action-button"
            id="admin-user-table-action-button">
            <DeleteIcon />Delete
          </Button>
        </Box>
      ),
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

              <AdminHeader title="USERS"
                subtitle="Welcome to User Page"
              />

            </Box>
          </Box>
          <Box
            m="5px 0 10px 0"
            ml="16rem"
            mr="0.5rem"
          >
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
              rows={allUsers}
              columns={columns}
              slots={{
                toolbar: customToolbar,
                noRowsOverlay: customNoRowsOverlay
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 8,
                  },
                },
              }}
              pageSizeOptions={[8]}

              // ?checkboxes
              checkboxSelection

              // ?to disable selection of rows on mouse click anywhere on the table
              disableRowSelectionOnClick

            />

          </Box>

        </ThemeProvider>
      </ColorModeContext.Provider>


    </>
  )
}
export default AdminUsers;