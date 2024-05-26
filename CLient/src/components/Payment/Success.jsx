import { useUserContext } from "../../Context/UserContext";
import "./Success.css";
import { NavLink } from "react-router-dom";
import FormatPrice from "../../Helper/FormatPrice";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import toastMessage from "../ToastMessage";
const Success = () => {

  const { cartItems, clearCartItems, user, deliveryCharge } = useUserContext();
  const [loader, setLoader] = useState(true);
  const [discount, setDiscount] = useState(JSON.parse(localStorage.getItem("discount")));
  const [totalCartItemPrice, setTotalCartItemPrice] = useState(JSON.parse(localStorage.getItem("totalCartItemPrice")));
  useEffect(() => {

    const placeOrder = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/placeOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            restaurant: cartItems[0].restaurant,
            address: localStorage.getItem("address"),
            cartItems,
            totalAmount: discount ? totalCartItemPrice + deliveryCharge - discount : totalCartItemPrice + deliveryCharge,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          toastMessage({ msg: data.message, type: "error" });
        }

        // toastMessage({ msg: data.message, type: "success" });
        setTimeout(() => {
          setLoader(false);
          localStorage.removeItem("discount");
          localStorage.removeItem("totalCartItemPrice");
          localStorage.removeItem("address");
          clearCartItems();
        }, 2000);
      } catch (error) {
        console.log(error);
        toastMessage({ msg: error.message, type: "error" });
      }
    }

    placeOrder();
  }, []);

  return (
    loader ? <div className="payment-success-loader">

    </div> :
      <>
        <Navbar />
        <div className="container" style={{ marginTop: "100px" }}>
          <div className="success-page">
            <img src="https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png" alt="success" />
            <h2>Payment Successful!</h2>
            <p>Thank you! Your payment of <FormatPrice price={discount ? totalCartItemPrice + deliveryCharge - discount : totalCartItemPrice + deliveryCharge} /> has been received.</p>
            <NavLink to="/">
              <button className="btn">
                Back to Home
              </button>
            </NavLink>
          </div>
        </div>
        <Footer />
      </>
  )
}

export default Success