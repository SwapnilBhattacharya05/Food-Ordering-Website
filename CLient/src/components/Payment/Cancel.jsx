import { NavLink } from "react-router-dom"
import './Cancel.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const Cancel = () => {
    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: "120px" }}>
                <div className="cancel-page">
                    <img
                        src="https://thumbs.dreamstime.com/b/broken-credit-card-debt-bankruptcy-failed-money-transaction-vector-stock-illustration-262717746.jpg"
                        alt="cancel" />
                    <h2>Payment Error!</h2>
                    <p>Sorry, for the inconvenience. Please try again later.</p>
                    <NavLink to="/">
                        <button className="btn">Back to Home</button>
                    </NavLink>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cancel