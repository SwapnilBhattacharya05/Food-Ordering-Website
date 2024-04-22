import React, { useState } from 'react'
import { tokens, useMode } from '../../Admin/theme'
import { Box, Typography } from '@mui/material';
import { mockOrders } from '../../../data/MockData';
import "../Profile.css"

const Orders = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const [orders, setOrders] = useState(mockOrders);
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: 373.5,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    mt: -4,
                }}
            >
                <Box className="row"
                    sx={{
                        ml: 5,
                    }}
                >
                    {
                        orders.map((value) => {
                            const { id, img, variety, restaurantName, foodItems, location, orderTime, city, state, pincode, deliverTime, delivered } = value
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
                                                backgroundColor: colors.greenAccent[500],
                                            }}
                                        >
                                            <img
                                                src={img}
                                                height={150.5}
                                                width="100%"
                                                alt="Some Food was here"
                                            />

                                        </Box>
                                        <Box className='profile-option-orders-right'
                                            sx={{
                                                width: "70%",
                                                textAlign: "left",
                                                textIndent: "10px",
                                                backgroundColor: colors.redAccent[500],
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