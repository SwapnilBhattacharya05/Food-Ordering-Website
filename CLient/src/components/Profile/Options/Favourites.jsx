import React, { useState } from 'react'
import { Box, Typography, Button, IconButton, Icon } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { tokens, useMode } from '../../Admin/theme';
import { mockFavourites } from '../../../data/MockData';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';

const Favourites = () => {
    const [profileFavourites, setProfileFavourites] = useState(mockFavourites);
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: '439px',
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        // overflow: 'auto',
                        overflowX: 'hidden',
                        ml: 5,
                    }}
                >
                    <Box className="row">
                        {
                            profileFavourites.map((value) => {
                                const { id, img, variety, restaurantName, foodName, location, city, state, pincode, rating } = value;
                                return (

                                    // ?CONTAINER AND ROW
                                    <Box className="favourite-card-main">
                                        {/* CARD */}
                                        <Box className="profile-option-card"
                                            key={id}
                                            sx={{
                                                display: 'flex',
                                                border: variety === "NonVeg" ? "2px solid" + colors.redAccent[500] : "2px solid" + colors.greenAccent[500],
                                            }}

                                        >
                                            {/* CARD LEFT */}
                                            <Box className="profile-option-card-left"
                                                sx={{
                                                    width: "20%",
                                                }}
                                            >
                                                {/* CARD LEFT IMAGE */}
                                                <img
                                                    src={img}
                                                    height={107}
                                                    width={100}
                                                />

                                            </Box>

                                            {/* CARD RIGHT */}
                                            <Box className="profile-option-card-right"
                                                sx={{
                                                    width: "80%",
                                                    textAlign: "left",
                                                    ml: 7,
                                                    mt: 1.2,
                                                }}
                                            >

                                                {/* CARD RIGHT CONTENT */}
                                                <Box
                                                    sx={{
                                                        fontSize: 13.5,
                                                    }}
                                                >
                                                    From: {restaurantName}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        fontSize: 13.5,
                                                    }}
                                                >
                                                    Item: {foodName}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        fontSize: 10.5,
                                                        maxWidth: 130,
                                                    }}
                                                >
                                                    <strong>Direction:</strong>&nbsp;{location}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        mt: -0.5,
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >

                                                    {/* RATING */}
                                                    <Rating
                                                        name="read-only"
                                                        value={rating}
                                                        precision={0.5}
                                                        readOnly
                                                        size='small'
                                                    />

                                                    {/* DELETE BUTTON */}
                                                    <IconButton
                                                        aria-label='delete'
                                                        color="error"
                                                        size="small"
                                                        sx={{
                                                            border: "1px solid" + colors.redAccent[500],
                                                            ml: 3,
                                                            mt: 1,
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize='small' />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box >
        </>
    )
}
export default Favourites