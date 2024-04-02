import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar'
import "./Cart.css";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <div className='container cart-container'>
        <h3>Cart</h3>
      </div>
      <Footer />
    </div>
  )
}

export default Cart;