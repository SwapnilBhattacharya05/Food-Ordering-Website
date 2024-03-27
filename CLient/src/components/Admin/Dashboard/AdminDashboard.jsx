import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material"
import { mockTransactions, mockPieData, mockRestaurantRating } from '../../../data/MockData';
import { ColorModeContext, tokens, useMode } from '../theme'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import AdminTopbar from '../Global/AdminTopbar'
import AdminSidebar from '../Global/AdminSidebar'
import AdminHeader from '../Global/AdminHeader';
import AdminMapChart from '../Global/AdminMap';
import "./AdminDashboard.css";
import AdminStatbox from '../Global/Statbox';
import Rating from '@mui/material/Rating';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';

const AdminDashboard = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  // ?color palette for pie chart
  const palette = [
    colors.greenAccent[500],
    colors.greenAccent[300],
    colors.greenAccent[200],
    colors.greenAccent[100],
  ];

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* TOPBAR */}
          <AdminTopbar />

          {/* SIDEBAR */}
          <AdminSidebar />

          {/* CONTENT */}
          <Box
            ml="16rem"
            mt='4.324rem'
            mr='0.3125rem'
          >

            {/* HEADER */}
            <Box display="flex"
              justifyContent='space-between'
              alignItems='center'
            >
              <AdminHeader
                title="DASHBOARD"
                subtitle="Welcome to your dashboard"
              />
              <Box>
                <Button
                  variant='outlined'
                  color='secondary'
                  sx={{
                    float: "right",
                    mr: "10px",
                    padding: "0.5rem 1rem",
                  }}
                >
                  <DownloadOutlinedIcon
                    sx={{
                      mr: "0.625rem"
                    }}
                  />
                  Download Reports
                </Button>
              </Box>
            </Box>


            {/* GRIDS AND CHARTS */}
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="104px"
              gap="5px"
            >

              {/* ROW 1 */}
              <Box
                gridColumn="span 3"

                display="flex"
                justifyContent="center"
                alignItems="center"
                className="Admin-StatBox-Background"
              >
                <AdminStatbox
                  title="123456"
                  subtitle="Total Users"
                  progress='0.75'
                  increase='+14%'
                  icon={
                    <PersonAddAltOutlinedIcon />
                  }
                />
              </Box>

              <Box
                gridColumn="span 3"
                display="flex"
                justifyContent="center"
                alignItems="center"
                className="Admin-StatBox-Background"
              >
                <AdminStatbox
                  title="56789"
                  subtitle="Total Restaurants"
                  progress='0.5'
                  increase='+21%'
                  icon={
                    <StoreOutlinedIcon />
                  }
                />
              </Box>

              <Box
                gridColumn="span 3"
                display="flex"
                justifyContent="center"
                alignItems="center"
                className="Admin-StatBox-Background"
              >
                <AdminStatbox
                  title="9823"
                  subtitle="Total Transactions"
                  progress='0.30'
                  increase='+5%'
                  icon={
                    <CreditCardOutlinedIcon />
                  }
                />
              </Box>

              <Box
                gridColumn="span 3"
                display="flex"
                justifyContent="center"
                alignItems="center"
                className="Admin-StatBox-Background"
              >
                <AdminStatbox

                  title="123456"
                  // subtitle="subtitle"
                  icon={
                    'Total Delivery'
                  }
                  alternateIcon={
                    <img src="./img/alternateFoodDeliveryIcon.jpg"
                      height="70px"
                      width="100%"
                    />}
                />
              </Box>

              {/* ROW 2 */}
              <Box
                gridColumn="span 8"
                gridRow="span 2"
                className="Admin-Chart-Background"
              >
                <Box
                  mt="10px"
                  p="0 30px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box mt='-5px'>

                    {/* GRAPH TITLE */}
                    <Typography
                      variant="h5"
                      fontWeight="600"
                    >
                      Total Transactions on Monthly Basis
                    </Typography>

                    {/* GRAPH VALUE */}
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      display="flex"
                    >
                      {/* <CurrencyRupeeOutlinedIcon
                        sx={{
                          mr: "0.01rem"
                        }}
                      />  */}
                      123456
                    </Typography>
                  </Box>

                  {/* DOWNLOAD BUTTON */}
                  <Box>
                    <IconButton
                      variant='outlined'
                      color='secondary'

                      sx={{
                        borderRadius: "50px",
                        zIndex: "2",
                      }}
                    >
                      <DownloadOutlinedIcon
                        sx={{
                          fontSize: "30px",
                          color: colors.greenAccent[700],
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                {/* GRAPH */}
                <Box height="225px" mt="-45px">
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        color: '#10d8bd',
                        // ?area is used to fill the line graph with the color specified
                        // area: true,
                      },
                    ]}
                  />
                </Box>
              </Box>

              {/* TRANSACTIONS */}
              <Box
                gridColumn='span 4'
                gridRow='span 2'
                overflow="auto"
                className="Admin-Transaction-Background"
              >
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  borderBottom={`4px solid ${colors.primary[300]}`}
                  p='15px'
                >
                  <Typography
                    variant='h5'
                    fontWeight='600'
                  >
                    Recent Transactions
                  </Typography>
                </Box>
                {
                  mockTransactions.slice().reverse().slice(-10).map((transaction, i) => (
                    <Box
                      key={`${transaction.txId}-${i}`}
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      borderBottom={`4px solid ${colors.primary[200]}`}
                      p='15px'
                    >
                      <Box>
                        <Typography variant='h5' fontWeight='600'>
                          {transaction.txId}
                        </Typography>
                        <Typography>
                          {transaction.user}
                        </Typography>
                      </Box>
                      <Box>
                        {transaction.date}
                      </Box>
                      <Box
                        backgroundColor={colors.greenAccent[500]}
                        p='5px 10px'
                        borderRadius='4px'
                      >
                        <CurrencyRupeeOutlinedIcon
                          sx={{
                            fontSize: "15px",
                          }} />{transaction.cost}
                      </Box>
                    </Box>
                  ))
                }
              </Box>

              {/* ROW 3 */}
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                className="Admin-ThirdRow-Background"
                p="30px"
                sx={{
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{
                    marginTop: "-20px"
                  }}
                >
                  Food Category
                </Typography>
                <Box height="170px" >
                  <PieChart
                    colors={palette}
                    series={[
                      {
                        data: mockPieData,
                        highlightScope: {
                          faded: 'global',
                          highlighted: 'item',
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: 'grey'
                        },
                      },
                    ]}
                  // height={200}
                  />
                </Box>
              </Box>

              <Box
                gridColumn="span 4"
                gridRow="span 2"
                className="Admin-ThirdRow-Background"
                p="30px"
                sx={{
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant='h5'
                  fontWeight='600'
                  sx={{
                    marginTop: "-20px"
                  }}
                >
                  Restaurants Overview
                </Typography>
                <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                >
                  <AdminMapChart />
                </Box>
              </Box>

              <Box
                gridColumn="span 4"
                gridRow="span 2"
                className="Admin-ThirdRow-Background"
                p="30px"
                sx={{
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant='h5'
                  fontWeight='600'
                  sx={{
                    marginTop: "-20px"
                  }}
                >
                  Top Selling Restaurants
                </Typography>
                {mockRestaurantRating.slice(0, 3).map((restaurant, i) => (
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    mt='30px'
                    key={`${restaurant.txId}-${i}`}
                  >
                    <Typography
                      variant='h4'
                    >
                      {restaurant.name}
                    </Typography>
                    <Box>
                      <Rating
                        name="half-rating-read"
                        // !value is used to give the rating here
                        value={restaurant.value}
                        // ?precision is used to give the half ratings
                        precision={0.5}
                        readOnly

                      />
                    </Box>
                  </Box>
                ))
                }
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider >
    </>
  )
}
export default AdminDashboard;

