import React from 'react'
import "../Profile.css"
import { Box, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import { tokens, useMode } from '../../Admin/theme';
import Avatar from '@mui/material/Avatar';
import { useUserContext } from '../../../Context/UserContext';




const ProfileMain = () => {

    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const { user } = useUserContext();
    console.log(user)
    return (

        <>
            <Box className="profile-option-main-container"
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
                    height: '439px',
                    width: '100%',
                }}
            >

                <Box className='profile-option-main-form-left'
                    sx={{
                        height: '100%',
                        flex: 1,
                    }}
                >
                    <Box sx={{
                        marginTop: '30px',
                        marginLeft: '50px',
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        {/* FORM LABEL */}
                        <Typography variant='h6'
                            sx={{
                                marginRight: '30px'
                            }}
                        >
                            Name:
                        </Typography>

                        {/* ROW 1 */}
                        <TextField
                            type='text'
                            id="profile-first-name"
                            label="First Name"
                            variant="outlined"
                            defaultValue={user.firstName}
                            required
                            sx={{
                                marginRight: '10px',
                                width: '250px',

                            }}
                        />
                        <TextField
                            type='text'
                            id="profile-last-name"
                            label="Last Name"
                            variant="outlined"
                            defaultValue={user.lastName}
                            required
                            sx={{
                                width: '250px',
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            marginTop: '30px',
                            marginLeft: '50px',
                            display: 'flex',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* FORM LABEL */}
                        <Typography variant='h6'
                            sx={{
                                marginRight: '10px'
                            }}
                        >
                            Account:
                        </Typography>

                        {/* ROW 2 */}
                        <Box>
                            <TextField
                                type='number'
                                id="profile-contact"
                                label="Contact No."
                                variant="outlined"
                                defaultValue={user.phone}
                                required
                                sx={{
                                    marginRight: '10px',
                                    width: '250px',

                                }}
                            />
                            <TextField
                                type='email'
                                id="profile-email"
                                label="Email"
                                variant="outlined"
                                defaultValue={user.email}
                                required
                                sx={{
                                    width: '250px',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* ROW 3 */}
                    <Box sx={{
                        marginTop: '30px',
                        marginLeft: '50px',
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        {/* FORM LABEL */}
                        <Typography variant='h6'
                            sx={{
                                marginRight: '10px'
                            }}
                        >
                            Address:
                        </Typography>
                        <Box>

                            <TextField
                                id="profile-address"
                                type='text'
                                variant="outlined"
                                multiline
                                devaultValue={user.address}
                                rows={6}
                                required
                                sx={{
                                    width: '510px',
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </Box>
                    </Box>
                </Box>

                <Box className="profile-option-main-form-right"
                    sx={{
                        height: '100%',
                        flex: 2,

                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt='User Main Image'
                            src={user.image}
                            sx={{
                                height: 200,
                                width: 200,
                                border: '2px solid ' + colors.greenAccent[500],
                            }}
                        />
                    </Box>

                    {/* SUBMIT BUTTON */}
                    <Box className="profile-option-main-form-button">
                        <Button
                            type='submit'
                            variant="contained"
                            id='profile-option-main-submit-button'
                            sx={{
                                marginTop: '125px',
                                p: '12px 50px',
                            }}
                        >
                            Edit
                        </Button>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default ProfileMain