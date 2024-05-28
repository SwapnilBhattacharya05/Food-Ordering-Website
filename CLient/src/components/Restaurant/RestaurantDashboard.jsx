import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material"
import { mockTransactions, mockPieData, mockRestaurantRating, mockProductRating } from '../../data/MockData';
import { ColorModeContext, tokens, useMode } from '../Admin/theme'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import AdminHeader from '../Admin/Global/AdminHeader';
import "./RestaurantDashboard.css";
import AdminStatbox from '../Admin/Global/Statbox';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantTopbar from './RestaurantTopbar';
import { useRestaurantContext } from '../../Context/RestaurantContext.js';



const xAxisIndex = () => {
  const xAxisData = [];
  for (let i = 1; i <= 30; i++) {
    xAxisData.push(i);
  }
  return xAxisData;
}

const RestaurantDashboard = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const {
    fetchAllOrders,
    allOrders,
    fetchAllFoodItems,
    allFoodItems,
    isLoading,
    fetchTopSellingDishes,
    topSellingDishes,
    allUsers,
    fetchAllUsers,
    allCoupons,
    fetchAllCoupons,
  } = useRestaurantContext();

  // ?color palette for pie chart
  const palette = [
    colors.greenAccent[500],
    colors.greenAccent[300],
    colors.greenAccent[200],
    colors.greenAccent[100],
  ];

  const [orders, setOrders] = useState(allOrders);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [foodItems, setFoodItems] = useState(allFoodItems);
  const [topDishes, setTopDishes] = useState(topSellingDishes);
  const [foodItemsByCategory, setFoodItemsByCategory] = useState([
    {
      label: "Veg",
      value: 0
    },
    {
      label: "Non-Veg",
      value: 0
    }
  ]);

  const restaurantId = sessionStorage.getItem("restaurantId");

  useEffect(() => {
    if (restaurantId) {
      fetchAllOrders();
      fetchAllFoodItems();
      fetchTopSellingDishes(restaurantId);
      fetchAllUsers();
      fetchAllCoupons();
    }
  }, [restaurantId]);

  useEffect(() => {
    if (restaurantId && allOrders.length) {
      const filteredOrders = allOrders.filter((order) => order.restaurant._id === restaurantId);
      setOrders(filteredOrders);
      const filterCompletedOrders = filteredOrders.filter((order) => order.status === "completed");
      setCompletedOrders(filterCompletedOrders);
      console.log(completedOrders);
    }
  }, [restaurantId, allOrders]);

  useEffect(() => {
    if (restaurantId && allFoodItems.length) {
      const filteredFoodItems = allFoodItems.filter((foodItem) => foodItem.restaurant._id === restaurantId);
      setFoodItems(filteredFoodItems);
      const filterFoodItemsByCategory = filteredFoodItems.reduce((accumulator, item) => {
        accumulator[item.category] += 1;
        return accumulator
      }, {
        "Veg": 0,
        "Non-Veg": 0,
      });
      setFoodItemsByCategory([{
        label: "Veg",
        value: filterFoodItemsByCategory["Veg"],
      }, {
        label: "Non-Veg",
        value: filterFoodItemsByCategory["Non-Veg"],
      }]);
      console.log(filterFoodItemsByCategory);
    }
  }, [restaurantId, allFoodItems]);

  useEffect(() => {
    if (restaurantId && topSellingDishes.length) {
      const filteredTopSellingDishes = topSellingDishes.filter((dish) => dish._id === restaurantId);
      setTopDishes(filteredTopSellingDishes);
      console.log(topDishes);
    }
  }, [restaurantId, topSellingDishes]);

  useEffect(() => {
    if (restaurantId && foodItemsByCategory) {
      console.log(foodItemsByCategory);
    }
  }, [restaurantId, foodItemsByCategory]);

  useEffect(() => {
    if (restaurantId && allUsers) {
      console.log(allUsers);
    }
  }, [restaurantId, allUsers]);

  useEffect(() => {
    if (restaurantId && allCoupons) {
      console.log(allCoupons);
    }
  }, [restaurantId, allCoupons]);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* TOPBAR */}
          <RestaurantTopbar />

          {/* SIDEBAR */}
          <RestaurantSidebar />

          {/* CONTENT */}
          <Box
            ml="16rem"
            mt='3.324rem'
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
                  title={allUsers && allUsers.length}
                  subtitle="Total Customers"
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
                  title={foodItems && foodItems.length}
                  subtitle="Total Foods"
                  progress='0.7'
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
                  title={orders && orders.length}
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

                  title={completedOrders && completedOrders.length}
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
                      12234
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
                    xAxis={[{ data: xAxisIndex() }]}
                    series={[
                      {
                        data: [23, 7, 45, 12, 38, 6, 29, 17, 41, 3, 20, 33, 10, 26, 49, 14, 36, 9, 22, 47, 19, 31, 2, 40, 16, 43, 28, 5, 37, 11],
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
                  orders.slice().reverse().slice(-10).map((order, i) => (
                    <Box
                      key={`${order._id}-${i}`}
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      borderBottom={`4px solid ${colors.primary[200]}`}
                      p='15px'
                    >
                      <Box>
                        <Typography variant='h6' fontWeight='600'>
                          {order._id}
                        </Typography>
                        <Typography>
                          {order.user?.firstName}
                        </Typography>
                      </Box>
                      <Box>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Box>
                      <Box
                        backgroundColor={colors.greenAccent[500]}
                        p='5px 10px'
                        borderRadius='4px'
                      >
                        <CurrencyRupeeOutlinedIcon
                          sx={{
                            fontSize: "15px",
                          }} />{order.totalAmount}
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
                        data: foodItemsByCategory,
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
                  Top Selling Products
                </Typography>
                {topSellingDishes.slice(0, 3).map((restaurant, i) => (
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    mt='30px'
                    key={`${restaurant.txId}-${i}`}
                  >
                    <Typography
                      variant='h4'
                    >
                      {restaurant._id}
                    </Typography>
                    <Box>
                      <Typography
                        variant='h6'
                      >
                        {restaurant.count}
                      </Typography>
                    </Box>
                  </Box>
                ))
                }
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default RestaurantDashboard;