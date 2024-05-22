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
                    height: 380,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    mt: 1,
                }}
            >

                <Box className="row"

                    sx={{
                        ml: 5,
                    }}>
                    <Box>
                        <Box className="profile-address-button-adder"
                            sx={{
                                display: "flex",
                                justifySelf: "flex-start",
                                pb: 1,
                                pl: 5,
                            }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    borderRadius: "10px",
                                    p: 1,
                                }}
                                data-toggle='modal'
                                data-target='#addModal'
                            >
                                Add New Address
                            </Button>
                        </Box>

                        <Box className="profile-address-container"
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                flexWrap: "wrap",
                                width: "71vw",
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
                                            key={id}
                                            sx={{
                                                display: "flex",
                                                width: "29vw",
                                                height: "23vh",
                                                border: "1px solid black",
                                                borderRadius: "10px",
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
            </Box>

            {/* EDIT MODAL */}
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
                                        id="profile-address-type"
                                        select
                                        name="type"
                                        variant="outlined"
                                        required
                                        SelectProps={{
                                            native: true,
                                        }}
                                        sx={{
                                            width: 450,
                                            mb: 2,
                                        }}
                                    >
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,

                                            }}
                                        >
                                            Home
                                        </option>
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,

                                            }}
                                        >
                                            Work
                                        </option>
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,


                                            }}
                                        >
                                            Other
                                        </option>
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
            </div >

            {/* ADD MODAL */}
            <div className="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content profile-modal">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addModalLabel">Change Address</h5>
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
                                        id="profile-address-type"
                                        select
                                        name="type"
                                        variant="outlined"
                                        required
                                        SelectProps={{
                                            native: true,
                                        }}
                                        sx={{
                                            width: 450,
                                            mb: 2,
                                        }}
                                    >
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,

                                            }}
                                        >
                                            Home
                                        </option>
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,

                                            }}
                                        >
                                            Work
                                        </option>
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,


                                            }}
                                        >
                                            Other
                                        </option>
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
            </div >

        </>
    )
}
export default Address