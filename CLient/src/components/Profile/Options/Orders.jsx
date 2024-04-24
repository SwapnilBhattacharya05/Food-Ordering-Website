import React, { useState } from 'react'
import { tokens, useMode } from '../../Admin/theme'
import { Box, Typography, Button, IconButton } from "@mui/material";
import { mockOrders } from '../../../data/MockData';
import "../Profile.css"
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const Orders = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const [orders, setOrders] = useState(mockOrders);
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
                        orders.map((value) => {
                            const { id, img, variety, restaurantName, foodItems, location, orderTime, city, state, pincode, deliverTime, delivered, price } = value
                            return (
                                <Box className='profile-orders-list-main'
                                    sx={{
                                        mt: 2,
                                    }}
                                >
                                    <Box className='profile-option-orders'
                                        key={id}
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
                                                src={img}
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
                                                        {restaurantName}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        fontSize: 13,
                                                        mr: 1,
                                                    }}
                                                >
                                                    Delivered&nbsp;on:&nbsp;{deliverTime}&nbsp;{delivered
                                                        ?
                                                        <CheckCircleIcon color="success"
                                                        />
                                                        :
                                                        <CancelIcon color="warning"
                                                        />
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
                                                    {location}
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
                                                ORDER&nbsp;#{id}&nbsp;|&nbsp;{orderTime}
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
                                                    {foodItems.join(" + ")}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        mr: 1.5,
                                                    }}
                                                >
                                                    Total&nbsp;Paid&nbsp;₹&nbsp;{price}
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    variant="outlined"
                                                    color="warning"
                                                    sx={{
                                                        backgroundColor: "transparent",
                                                    }}
                                                >REORDER

                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )

                        })

                    }
                </Box>
            </Box >
        </>
    )
}

export default Orders