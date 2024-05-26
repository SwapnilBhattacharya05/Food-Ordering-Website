import React, { useRef, useState } from 'react'
import { tokens, useMode } from '../../Admin/theme'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { mockAddress } from '../../../data/MockData';
import "../Profile.css"
import toastMessage from '../../ToastMessage';
import { useUserContext } from '../../../Context/UserContext';

const Address = () => {
    const [theme, colorMode] = useMode()
    const { user, setUser, userAddress } = useUserContext();
    const colors = tokens(theme.palette.mode);
    const [addressIndex, setAddressIndex] = useState(null);
    const [newAddress, setNewAddress] = useState({
        type: "Home",
        address: "",
    });

    const cancelRef = useRef(null);


    const handleOnChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
        console.log(newAddress);
    }

    const handleAddNewAddress = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/addAddress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    type: newAddress.type,
                    address: newAddress.address
                })
            });

            const json = await response.json();
            if (!json.success) {
                return toastMessage({ msg: json.message, type: "error" });
            } else {
                cancelRef.current.click();
                return toastMessage({ msg: json.message, type: "success" });
            }
        } catch (error) {
            console.log(error);
            toastMessage({ msg: error.message, type: "error" });
        }
    }

    const handleDeleteAddress = async (index) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/deleteAddress/${index}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            });

            const json = await response.json();
            if (!json.success) {
                return toastMessage({ msg: json.message, type: "error" });
            } else {
                return toastMessage({ msg: json.message, type: "success" });
            }
        } catch (error) {
            console.log(error);
            toastMessage({ msg: error.message, type: "error" });
        }
    }


    const handleEditAddress = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/updateAddress/${addressIndex}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    type: newAddress.type,
                    address: newAddress.address
                })
            });

            const json = await response.json();
            if (!json.success) {
                return toastMessage({ msg: json.message, type: "error" });
            } else {
                cancelRef.current.click();
                return toastMessage({ msg: json.message, type: "success" });
            }
        } catch (error) {
            console.log(error);
            toastMessage({ msg: error.message, type: "error" });
        }
    }

    const handleEdit = (index) => {
        setNewAddress({ type: userAddress[index].type, address: userAddress[index].address });
        setAddressIndex(index);
    }

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
                                userAddress.map((value, index) => {
                                    const { type, address } = value
                                    return (
                                        <Box className="profile-address-card"
                                            key={index}
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
                                                        data-target='#editModal'
                                                        onClick={() => handleEdit(index)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color='error'
                                                        onClick={() => handleDeleteAddress(index)}
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
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content profile-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Change Address</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                                        value={newAddress.type}
                                        onChange={handleOnChange}
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
                                            value={"Home"}
                                        >
                                            Home
                                        </option>
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,

                                            }}
                                            value={"Work"}
                                        >
                                            Work
                                        </option>
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                            }}
                                            value={"Other"}
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
                                        value={newAddress.address}
                                        onChange={handleOnChange}
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
                        <div className="modal-footer"
                            style={{
                                display: 'flex',
                                gap: 5
                            }}>
                            <Button variant='outlined' ref={cancelRef} color='error' data-dismiss="modal">Close</Button>
                            <Button
                                variant="outlined"
                                color='success'
                                onClick={handleEditAddress}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD MODAL */}
            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content profile-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Change Address</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                                        value={newAddress.type}
                                        onChange={handleOnChange}
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
                                            value={"Home"}
                                        >
                                            Home
                                        </option>
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,

                                            }}
                                            value={"Work"}
                                        >
                                            Work
                                        </option>
                                        <option
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,


                                            }}
                                            value={"Other"}
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
                                        value={newAddress.address}
                                        onChange={handleOnChange}
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
                        <div className="modal-footer"
                            style={{
                                display: 'flex',
                                gap: 5
                            }}>
                            <Button variant='outlined' ref={cancelRef} color='error' data-dismiss="modal">Close</Button>
                            <Button
                                variant="outlined"
                                color='success'
                                onClick={handleAddNewAddress}
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