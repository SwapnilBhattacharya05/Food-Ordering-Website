import React from 'react'
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import AdminProgressCircle from './ProgressCircle';



const AdminStatbox = ({ title, subtitle, icon, progress, increase, alternateIcon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (

        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography
                        variant='h5'
                        fontWeight="bold"
                    >
                        {icon}
                    </Typography>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    {
                        alternateIcon ? (
                            <Typography>{alternateIcon}</Typography>
                        ) : (
                            <AdminProgressCircle progressValue={progress} />
                        )

                    }
                </Box>
            </Box>

            <Box
                display="flex" justifyContent="space-between">
                <Typography variant="h5">
                    {subtitle}
                </Typography>

                <Typography
                    variant="h5"
                    fontStyle='italic'
                >
                    {increase}
                </Typography>
            </Box>
        </Box>


    )
}
export default AdminStatbox;