import React from 'react'
import { tokens, useMode } from '../../Admin/theme'
import { Box, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Address = () => {
    const [theme, colorMode] = useMode()
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
                        }}
                    >
                        <Box className="profile-address-card"
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
                                    pt: 1,
                                    height: "100%"
                                }}
                            >
                                <HomeIcon className='profile-address-icon' sx={{
                                    fontSize: "2.5rem",
                                }} />
                            </Box>
                            <Box className="profile-address-detail"
                                sx={{
                                    width: '85%',
                                    // backgroundColor: "blue",
                                    height: "100%",
                                    pt: 1,

                                }}
                            >
                                <Box className="profile-address-detail-title"
                                    sx={{
                                        textAlign: "left",
                                        fontWeight: 800,
                                    }}
                                >
                                    Home
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
                                        display:"flex",
                                        alignItems:"center",
                                    }}
                                >
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio iusto ipsum velit, veniam molestiae saepe 
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
                    </Box>
                </Box>
            </Box>

        </>
    )
}
export default Address