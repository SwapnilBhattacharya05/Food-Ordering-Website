import React from 'react'
import "../Profile.css"
import { Box } from '@mui/material'

const ProfileMain = () => {

    return (
        <>
            {/* first name
            last name
            phone
            Email
            password
            address */}
            <Box>
                <Box className=""
                    sx={{
                        marginLeft: '70px',
                        width: '90%',
                    }}
                >
                    <form className='ProfileMain-Container'>
                        <Box className="row">
                            <label>First Name</label>
                            <input id="firstname" type="text" placeholder="First Name" />
                            <label>Last Name</label>
                            <input id="lastname" type="text" placeholder="Last Name" />
                        </Box>
                        <Box className="row">
                            <label>Email</label>
                            <input id="firstname" type="email" placeholder="First Name" />
                            <label>Contact no.</label>
                            <input id="lastname" type="number" placeholder="Last Name" />
                        </Box>
                        <Box className="row">

                            <label>Address</label>
                            <textarea id="address" type="text" placeholder="Address"
                                style={{
                                    resize: 'none',
                                    height: "250px",
                                    width: "90%",
                                }}
                            />

                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default ProfileMain