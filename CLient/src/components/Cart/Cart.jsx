import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import CartQuantityToggle from '../../Helper/CartQuantityToggle';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'
import "./Cart.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { mockAddress } from '../../data/MockData';
import FormatPrice from '../../Helper/FormatPrice';
import { useAppContext } from '../../Context/AppContext';
import toastMessage from '../ToastMessage';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import { loadStripe } from "@stripe/stripe-js";
import BackToTop from '../../Helper/BackToTop';

const Cart = () => {
  const { user,
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeItem, clearCartItems,
    totalCartItemPrice,
    deliveryCharge,
    userAddress,
  } = useUserContext();

  const [address, setAddress] = useState(userAddress);
  const [coupon, setCoupon] = useState("");
  const [validCoupon, setValidCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const navigate = useNavigate();
  const { mode } = useAppContext();

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verifyCoupon/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ coupon: coupon.toUpperCase() })
    });

    const data = await response.json();
    if (!data.success) {
      setCoupon("");
      return toastMessage({ msg: data.message, type: "error" });
    }

    toastMessage({ msg: data.message, type: "success" });
    setDiscount(data.discount);
    localStorage.setItem("discount", data.discount);
    setValidCoupon(true);
  }

  const setAddressHandler = (value) => {
    setDeliveryAddress(value.address);
    localStorage.setItem("address", JSON.stringify(value.address));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    const totalAmount = validCoupon ? totalCartItemPrice + deliveryCharge - discount : totalCartItemPrice + deliveryCharge;
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/generatePayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cartItems,
        deliveryCharge,
        discount,
        totalAmount
      })
    });

    const session = await response.json();

    localStorage.setItem("totalCartItemPrice", JSON.stringify(totalAmount));
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionUrl
    });

    if (result.error) {
      toastMessage({ msg: result.error.message, type: "error" });
    }
  }

  useEffect(() => {
    BackToTop();
  }, []);
  
  return (
    <div>
      <Navbar />
      <div className='container cart-container'>
        {
          cartItems.length ?
            <>
              <section className='cart-header-section'>
                <img src={user.image} alt="user" />
                <h4>{user.firstName + " " + user.lastName}</h4>
              </section>
              <section className='cart-items-table-container'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className='d-flex align-items-center'>
                            <img src={item.image} alt={item.name} />
                            <div>
                              <p style={{ marginBottom: "0" }}>{item.name}</p>
                              <p style={{ marginBottom: "0", color: "gray", fontSize: "12px" }}>{item.restaurant.name}</p>
                            </div>
                          </td>
                          <td>{<FormatPrice price={item.price} />}</td>
                          <td>
                            <CartQuantityToggle quantity={item.quantity}
                              onIncrement={() => incrementQuantity(item._id)}
                              onDecrement={() => decrementQuantity(item._id)}
                            />
                          </td>
                          <td><FormatPrice price={item.price * item.quantity} /></td>
                          <td><button onClick={() => removeItem(item._id)}><DeleteIcon /></button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </section>
              <section className='cart-button-container'>
                <button className='btn' onClick={() => navigate("/search")}>Continue Shopping</button>
                <button className='btn' onClick={() => clearCartItems()}>Clear Cart</button>
              </section>
              <div className='divider'>
                <section className='cart-address-container'>
                  <Box>
                    <Typography variant="h6"
                      sx={{
                        fontWeight: 600,
                        pl: 8,
                      }}
                    >Select your Address</Typography>
                  </Box>

                  <Box className="cart-address-container-wrapper">
                    {
                      address.length === 0 ? <button className="btn"
                        onClick={() => navigate("/profile")}
                      >
                        Add Address
                      </button> :
                        address.map((value, index) => {
                          const { type, address } = value
                          return (
                            <Box className="profile-address-card"
                              key={index}
                              sx={{
                                display: "flex",
                                width: "20vw",
                                height: "23vh",
                                border: "1px solid black",
                                borderRadius: "10px",
                              }}
                            >
                              <Box className="profile-address-icon"
                                sx={{
                                  width: '15%',
                                  // backgroundColor: "red",
                                  pt: 1.5,
                                  height: "100%"
                                }}
                              >
                                {type === "Home" ? <HomeIcon /> : type === "Work" ? <WorkIcon /> : <FmdGoodIcon />}
                              </Box>
                              <Box className="profile-address-detail"
                                sx={{
                                  width: '85%',
                                  // backgroundColor: "blue",
                                  height: "100%",
                                  pt: 1.5,

                                }}
                              >
                                <Box className="profile-address-detail-title"
                                  sx={{
                                    textAlign: "left",
                                    fontWeight: 800,
                                  }}
                                >
                                  {type}
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
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {address}
                                </Box>
                                <Box className="profile-address-detail-buttons"
                                  sx={{
                                    display: "flex",
                                    gap: "1rem",
                                    justifyContent: "flex-end",
                                    p: "0 10px",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    color='success'
                                    onClick={() => setAddressHandler(value)}
                                  >
                                    Use
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          )
                        })
                    }
                  </Box>
                </section>
                <section className='cart-bill-container'>
                  <form method='post' onSubmit={handleCouponSubmit}>
                    <input className='input'
                      type="text"
                      placeholder='Apply Coupon'
                      readOnly={validCoupon}
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <input
                      className='btn'
                      type="submit"
                      disabled={!coupon || validCoupon}
                      value="Apply"
                    />
                  </form>

                  <div className='cart-bill'>
                    <h6>Bill Details</h6>
                    <div className='cart-bill-row'>
                      <p>Subtotal</p>
                      <p className='price'>{<FormatPrice price={totalCartItemPrice} />}</p>
                    </div>
                    <div className='cart-bill-row'>
                      <p>Delivery Charge</p>
                      <p className='price'>{<FormatPrice price={deliveryCharge} />}</p>
                    </div>
                    <div style={mode === "light-mode" ? { borderTop: "2px solid black" } : { borderTop: "2px solid white" }}></div>
                    {
                      validCoupon ?
                        <div>
                          <div className='cart-bill-row'>
                            <p>Discount</p>
                            <p className='price'>- {<FormatPrice price={discount / 100 * 100} />}</p>
                          </div>
                          <div style={mode === "light-mode" ? { borderTop: "2px solid black" } : { borderTop: "2px solid white" }}></div>
                        </div>
                        : null
                    }
                    <div className='cart-bill-row mt-1'>
                      <h6>Grand Total</h6>
                      <p className='price'>{<FormatPrice price={validCoupon ? totalCartItemPrice - discount + deliveryCharge : totalCartItemPrice + deliveryCharge} />}</p>
                    </div>
                  </div>
                </section>

              </div>
              <form className='cart-footer' method='post' onSubmit={placeOrder}>
                <div className='d-flex align-items-center' style={{ width: "100%", justifyContent: "flex-start", gap: "1rem" }}>
                  <Typography variant="h6">Delivery Address:</Typography>
                  <input type="text"
                    value={deliveryAddress}
                    placeholder='Choose Delivery Address'
                    readOnly
                  />
                </div>
                <button className='btn'
                  style={{ width: "200px", fontSize: "20px" }}
                  type='submit'
                  disabled={!deliveryAddress}
                  title={!deliveryAddress ? "Please choose delivery address" : null}
                >
                  Place Order
                </button>
              </form>
            </>
            :
            <div style={{ textAlign: 'center' }}>
              <img style={{ display: 'block', margin: 'auto', height: "300px", width: "300px" }}
                src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp"
                alt="empty-cart"
              />
              <h1>Your cart is empty</h1>
              <button className='btn' onClick={() => navigate("/search")}>Continue Shopping</button>
            </div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default Cart;