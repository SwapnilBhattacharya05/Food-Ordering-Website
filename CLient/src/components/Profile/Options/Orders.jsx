import React from 'react'
import { tokens, useMode } from '../../Admin/theme'
import { Box, Typography, Button, IconButton } from "@mui/material";
import { mockOrders } from '../../../data/MockData';
import "../Profile.css"
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useUserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';


const Orders = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const { orderHistory } = useUserContext();
    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: 415,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                <Box className="row"
                    sx={{
                        ml: 5,
                    }}
                >
                    {
                        orderHistory.map((value, index) => {
                            const { _id, status, foodItems, totalAmount, createdAt } = value;
                            const { name, address, imgUrls } = value.restaurant;

                            return (
                                <Box key={index} className='profile-orders-list-main'
                                    sx={{
                                        mt: 2,
                                    }}
                                >
                                    <Box className='profile-option-orders'
                                        key={_id}
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <Box className='profile-option-orders-left'
                                            sx={{
                                                width: "30%",
                                            }}
                                        >
                                            <img
                                                src={imgUrls[0]}
                                                height={169}
                                                width="100%"
                                                alt="Some Food was here"
                                            />

                                        </Box>
                                        <Box className='profile-option-orders-right'
                                            sx={{
                                                width: "70%",
                                                textAlign: "left",
                                                textIndent: "10px",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="h5"
                                                        sx={{
                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        {name}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        fontSize: 13,
                                                        mr: 1,
                                                    }}
                                                >
                                                    {
                                                        status !== "Completed" ? "Not delivered yet" :
                                                            <>
                                                                Delivered&nbsp;on:&nbsp;{new Date(createdAt).toLocaleTimeString()}&nbsp;
                                                                <CheckCircleIcon color="success" />
                                                            </>
                                                    }
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: 200,
                                                }}
                                            >
                                                <Typography variant="h6"
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {address}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: 600,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    fontSize: 13.5,
                                                }}
                                            >
                                                ORDER&nbsp;#{_id}&nbsp;|&nbsp;{new Date(createdAt).toDateString()}
                                            </Box>
                                            <Divider
                                                sx={{
                                                    mt: 1,
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    mt: 0.5,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        fontSize: 13.5,
                                                    }}
                                                >
                                                    {foodItems.map((value) => {
                                                        return value.name + " x " + value.quantity + " | "
                                                    })}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        mr: 1.5,
                                                    }}
                                                >
                                                    Total&nbsp;Paid&nbsp;₹&nbsp;{totalAmount}
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    variant="outlined"
                                                    color="warning"
                                                    sx={{
                                                        backgroundColor: "transparent",
                                                    }}
                                                    onClick={() => { navigate(`/restaurant/${value.restaurant._id}`) }}
                                                >REORDER
                                                </Button>
                                                {
                                                    status !== "Completed" &&
                                                    <Button variant="contained"
                                                        color='success'
                                                        sx={{
                                                            ml: 1.5,
                                                            backgroundColor: colors.greenAccent[500],
                                                        }}
                                                        onClick={() => { navigate(`/track-order/${value._id}`) }}
                                                    >
                                                        Track Order
                                                    </Button>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )

                        })

                    }
                </Box>
            </Box>
        </>
    )
}

export default Orders