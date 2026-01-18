import React, { useRef, useState, useEffect } from 'react'
import { tokens, useMode } from '../../Admin/theme'
import { Box, Button, TextField, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import "../Profile.css"
import toastMessage from '../../ToastMessage';
import { useUserContext } from '../../../Context/UserContext';
import { getAuthToken } from '../../../Helper/authHelper';

const Address = () => {
    const [theme] = useMode()
    const { user, userAddress, updateAddress } = useUserContext();
    const colors = tokens(theme.palette.mode);
    const [addressIndex, setAddressIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newAddress, setNewAddress] = useState({
        type: "Home",
        address: "",
    });

    const cancelRef = useRef(null);

    // Fetch addresses when component mounts
    useEffect(() => {
        const fetchAddresses = async () => {
            if (!user) return;
            
            const token = getAuthToken();
            if (!token) {
                console.log("No valid token found");
                setLoading(false);
                return;
            }
            
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllAddress`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                });
                const data = await response.json();
                if (data.success !== false && data.address) {
                    // Addresses will be updated via context if updateAddress exists
                }
            } catch (error) {
                console.error("Error fetching addresses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAddresses();
    }, [user]);


    const handleOnChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    }

    const handleAddNewAddress = async (e) => {
        e.preventDefault();

        const token = getAuthToken();
        if (!token) {
            return toastMessage({ msg: "Authentication required", type: "error" });
        }
        
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/addAddress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
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
        const confirmDelete = window.confirm('Are you sure you want to delete this address?');
        if (!confirmDelete) return;

        const token = getAuthToken();
        if (!token) {
            return toastMessage({ msg: "Authentication required", type: "error" });
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/deleteAddress/${index}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });

            const json = await response.json();
            if (!json.success) {
                toastMessage({ msg: json.message, type: "error" });
            } else {
                toastMessage({ msg: json.message, type: "success" });
                
                // Refresh addresses
                const refreshResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllAddress`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                });
                const refreshData = await refreshResponse.json();
                if (refreshData.address && updateAddress) {
                    updateAddress(refreshData.address);
                }
            }
        } catch (error) {
            console.log(error);
            toastMessage({ msg: error.message, type: "error" });
        }
    }


    const handleEditAddress = async (e) => {
        e.preventDefault();

        const token = getAuthToken();
        if (!token) {
            return toastMessage({ msg: "Authentication required", type: "error" });
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/updateAddress/${addressIndex}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
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
                                loading ? (
                                    <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                                        Loading addresses...
                                    </Typography>
                                ) : userAddress && userAddress.length > 0 ? (
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
                                ) : (
                                    <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                                        No addresses saved. Click "Add New Address" to get started.
                                    </Typography>
                                )
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