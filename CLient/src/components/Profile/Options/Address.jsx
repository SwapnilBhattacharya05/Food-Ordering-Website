import React, { useState } from 'react'
import { tokens, useMode } from '../../Admin/theme'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { mockAddress } from '../../../data/MockData';
import "../Profile.css"

const Address = () => {
    const [theme, colorMode] = useMode()
    const [address, useAddress] = useState(mockAddress)
    const colors = tokens(theme.palette.mode)
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: 373.5,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    mt: 2,
                }}
            >

                <Box className="row"

                    sx={{
                        ml: 5,
                    }}>

                    <Box className="profile-address-container"
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            flexWrap: "wrap",
                            width: "71vw",
                            height: 373.5,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            gap: 4,
                        }}
                    >
                        {
                            address.map((value) => {
                                const { id, type, address } = value
                                return (


                                    <Box className="profile-address-card"
                                        sx={{
                                            display: "flex",
                                            width: "29vw",
                                            height: "23vh",
                                            border: "1px solid black",
                                            borderRadius: "10px",
                                            key: { id },
                                        }}
                                    >
                                        <Box className="profile-address-icon"
                                            sx={{
                                                width: '15%',
                                                // backgroundColor: "red",
                                                pt: 1.5,
                                                height: "100%"
                                            }}
                                        >
                                            {type === "Home" ? <HomeIcon /> : type === "Work" ? <WorkIcon /> : <FmdGoodIcon />}
                                        </Box>
                                        <Box className="profile-address-detail"
                                            sx={{
                                                width: '85%',
                                                // backgroundColor: "blue",
                                                height: "100%",
                                                pt: 1.5,

                                            }}
                                        >
                                            <Box className="profile-address-detail-title"
                                                sx={{
                                                    textAlign: "left",
                                                    fontWeight: 800,
                                                }}
                                            >
                                                {type}
                                            </Box>
                                            <Box className="profile-address-detail-address"
                                                sx={{
                                                    height: "45%",
                                                    width: "100%",
                                                    overflow: 'hidden',
                                                    textOverflow: "ellipsis",
                                                    textAlign: "left",
                                                    fontSize: "0.9rem",
                                                    whiteSpace: "wrap",
                                                    mb: "0.7rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {address}
                                            </Box>
                                            <Box className="profile-address-detail-buttons"
                                                sx={{
                                                    display: "flex",
                                                    gap: "1rem",
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    color='success'
                                                    data-toggle='modal'
                                                    data-target='#exampleModal'
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color='error'
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>

            {/* MODAL */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content profile-modal">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Change Address</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Box className="profile-option-address-modal-container"
                                component="form"
                                autoComplete='off'
                                sx={{
                                    '&.MuiTextField-root': {
                                        m: 1,
                                        width: '25ch'
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: `${colors.greenAccent[500]} !important`,
                                        }
                                    },
                                    '& .Mui-focused fieldset': {
                                        borderColor: `${colors.greenAccent[500]} !important`,
                                    },
                                    ' & label': {
                                        color: `${colors.greenAccent[500]} !important`,
                                    },
                                    ' & label.Mui-focused': {
                                        color: `${colors.greenAccent[600]} !important`,
                                    },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: 200,
                                }}
                            >
                                <Box className="profile-option-address-modal-components"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        
                                    {/* ROW1 */}
                                    <Typography variant="h6"
                                        sx={{
                                            textAlign: "left",
                                        }}
                                    >
                                        Type:
                                    </Typography>
                                    <TextField
                                        type='text'
                                        id="profile-address-type"
                                        select
                                        name="type"
                                        variant="outlined"
                                        required
                                        sx={{
                                            width: 450,
                                            mb: 2,
                                        }}
                                    >
                                        <MenuItem
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,

                                            }}
                                        >
                                            <HomeIcon /> Home
                                        </MenuItem>
                                        <MenuItem
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,

                                            }}
                                        >
                                            <WorkIcon /> Work
                                        </MenuItem>
                                        <MenuItem
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,


                                            }}
                                        >
                                            <FmdGoodIcon /> Other
                                        </MenuItem>
                                    </TextField>

                                    {/* ROW2 */}
                                    <Typography variant="h6"
                                        sx={{
                                            textAlign: "left",
                                        }}
                                    >
                                        Address:
                                    </Typography>
                                    <TextField
                                        type='text'
                                        id="profile-address-address"
                                        name="address"
                                        variant="outlined"
                                        required
                                        sx={{
                                            width: 450,
                                            mb: 2,
                                        }}
                                    />

                                </Box>
                            </Box>
                        </div>
                        <div class="modal-footer"
                            style={{
                                display: 'flex',
                                gap: 5
                            }}>
                            <Button variant='outlined' color='error' data-dismiss="modal">Close</Button>
                            <Button
                                variant="outlined"
                                color='success'
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Address