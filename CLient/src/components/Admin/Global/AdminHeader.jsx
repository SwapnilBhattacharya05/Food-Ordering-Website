import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme'


const AdminHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box m={"20px"}>
        <Typography
          variant='h3'
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography
          variant='h6'
          sx={{ m: "0 0 5px 0" }}
        >
          {subtitle}
        </Typography>
      </Box >
    </>
  )
}
export default AdminHeader;