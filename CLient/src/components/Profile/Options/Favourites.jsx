import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { tokens, useMode } from '../../Admin/theme';
import { mockFavourites } from '../../../data/MockData';

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
                                        <Box className="profile-option-card" key={id}>
                                            <Box className="profile-option-card-top">
                                            </Box>
                                            <Box className="profile-option-card-bottom">
                                                <Box className="profile-option-card-bottom-left">
                                                </Box>
                                                <Box className="profile-option-card-bottom-right">
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