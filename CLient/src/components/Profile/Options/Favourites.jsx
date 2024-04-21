import React, { useState } from 'react'
import { Box, Typography, Button, IconButton, Icon, Hidden } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { tokens, useMode } from '../../Admin/theme';
import { mockFavourites } from '../../../data/MockData';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';



const useProfileFavourites = () => {
    const [profileFavourites, setProfileFavourites] = useState(mockFavourites);
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    return { profileFavourites, setProfileFavourites, colors };
};



// !Module View Section
const ModuleFavourites = () => {
    const { profileFavourites, setProfileFavourites, colors } = useProfileFavourites();

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
                    }}>
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
                                                alt="Some Food was here"
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
                                                From:&nbsp;{restaurantName}
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontSize: 13.5,
                                                }}
                                            >
                                                Item:&nbsp;{foodName}
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontSize: 10.5,
                                                    maxWidth: 130,
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                <strong>Direction:</strong>&nbsp;{location}
                                            </Box>
                                            <Box
                                                sx={{
                                                    mt: 0.5,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >

                                                {/* RATING */}
                                                <Rating
                                                    name="Ratings"
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
                                                        ml: 2,
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
        </>
    )
}


// !List View Section
const ListFavourites = () => {
    const { profileFavourites, setProfileFavourites, colors } = useProfileFavourites();
    return (
        <Box
            sx={{
                width: "100%",
                height: 373.5,
                overflowY: 'auto',
                overflowX: 'hidden',
                mt: -4,
            }}>

            <Box className="row"
                sx={{
                    ml: 5,
                }}>

                {
                    profileFavourites.map((value) => {
                        const { id, img, variety, restaurantName, foodName, location, city, state, pincode, rating } = value
                        return (
                            <Box className='favourite-list-main'>

                                <Box className='profile-option-list'
                                    key={id}
                                    sx={{
                                        display: "flex",
                                    }}
                                >

                                    <Box className='profile-option-list-left'
                                        sx={{
                                            width: "30%",
                                        }}>
                                        {/* LIST LEFT IMAGE */}
                                        <img
                                            src={img}
                                            height={150.5}
                                            width="100%"
                                            alt="Some Food was here"
                                        />
                                    </Box>

                                    {/* LIST RIGHT CONTENT */}
                                    <Box className='profile-option-list-right'
                                        sx={{
                                            display: "flex",
                                            width: "70%",
                                            textAlign: "left",
                                            ml: 2,
                                            mt: 1,
                                        }}>
                                        <Box className="profile-option-list-right-left-section"
                                            sx={{
                                                width: "70%",
                                            }}
                                        >
                                            <Box>
                                                <Typography variant='h5'>
                                                    From:&nbsp;{restaurantName}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography variant='h5'>
                                                    Item:&nbsp;{foodName}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    maxWidth: 400,
                                                    mt: 1,
                                                }}
                                            >
                                                <Typography variant='h6'

                                                    sx={{
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap",
                                                    }}>
                                                    <strong>Direction:</strong>&nbsp;{location}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className="profile-option-list-right-right-section"
                                            sx={{
                                                width: "30%",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    mt: 0.5,
                                                    ml: 3.5,
                                                }}
                                            >
                                            </Box>
                                            <Box

                                                sx={{
                                                    ml: 3.5,
                                                }}
                                            >
                                                <Rating
                                                    name='Ratings'
                                                    value={rating}
                                                    precision={0.5}
                                                    readOnly
                                                    size='large'
                                                />
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 5,
                                                    }}
                                                >

                                                    {/* VIEW ICON */}
                                                    <IconButton
                                                        aria-label='view'
                                                        size="medium"
                                                        sx={{
                                                            border: "1px solid" + colors.greenAccent[500],
                                                            mt: 4.5,
                                                        }}
                                                    >
                                                        <VisibilityIcon
                                                        className='view-icon-profile-favourite-section'
                                                            sx={{
                                                                fontSize: 35,
                                                            }}

                                                        />
                                                    </IconButton>

                                                    {/* DELETE ICON */}
                                                    <IconButton
                                                        aria-label='delete'
                                                        size="medium"
                                                        sx={{
                                                            border: "1px solid" + colors.redAccent[500],
                                                            mt: 4.5,
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            color='error'
                                                            sx={{
                                                                fontSize: 35,
                                                            }}

                                                        />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                }

            </Box>

        </Box>
    )
}

export { ModuleFavourites, ListFavourites }