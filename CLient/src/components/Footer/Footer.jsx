import "./Footer.css";
import { ArrowUpward, ContactEmergency, Email, Facebook, Handshake, Instagram, LocationOn, Phone, Pinterest, X, YouTube } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const Footer = () => {

    const backToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <footer className="footer-container mt-5">
            <div className="upper-footer" onClick={backToTop}>
                <p><ArrowUpward /> Back To Top</p>
            </div>
            <div className="main-footer mt-3">
                <div className="footer-columns">
                    <div className="d-flex flex-column footer-column">
                        <div className="footer-logo">
                            <h6>FOODZIE</h6>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/foodzie-bcbf4.appspot.com/o/foodzie_logo.png?alt=media&token=8ce6cfe2-8ff4-4186-8721-690d25eb7e2c"
                                alt="logo" />
                        </div>
                        <p>Follow Us @</p>
                        <ul className="social-icons gap-3 list-unstyled d-flex justify-content-start align-items-center">
                            <Link target="_blank" to={"https://www.facebook.com/"} style={{ color: "white" }}><li className="mr-2"><Facebook fontSize="large" /></li></Link>
                            <Link target="_blank" to={"https://www.instagram.com/"} style={{ color: "white" }}><li className="mr-2"><Instagram fontSize="large" /></li></Link>
                            <Link target="_blank" to={"https://www.twitter.com/"} style={{ color: "white" }}><li className="mr-2"><X fontSize="large" /></li></Link>
                            <Link target="_blank" to={"https://www.youtube.com/"} style={{ color: "white" }}><li className="mr-2"><YouTube fontSize="large" /></li></Link>
                            <Link target="_blank" to={"https://www.pinterest.com/"} style={{ color: "white" }}><li className="mr-2"><Pinterest fontSize="large" /></li></Link>
                        </ul>
                    </div>
                    <div className="flex-column d-flex align-items-center justify-content-center footer-column">
                        <h6 className="footer-heading">Quick Links</h6>
                        <ul className="list-unstyled d-flex align-items-center justify-content-center flex-column">
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link target="_blank" style={{ color: "white" }} to={"/"}><HomeIcon /> Home</Link></li>
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link target="_blank" style={{ color: "white" }} to={"/help"}><HelpIcon /> Help</Link></li>
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link target="_blank" style={{ color: "white" }} to={"/cart"}><ShoppingCartIcon /> Cart</Link></li>
                        </ul>
                    </div>
                    <div className="flex-column d-flex align-items-center justify-content-center footer-column">
                        <h6 className="footer-heading">Other Links</h6>
                        <ul className="list-unstyled d-flex align-items-center justify-content-center flex-column">
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link style={{ color: "white" }} to={"/about"}><InfoIcon /> About</Link></li>
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link style={{ color: "white" }} to={"/contact"}><ContactEmergency /> Contact</Link></li>
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link target="_blank" style={{ color: "white" }} to={"/partner-with-us"}><Handshake /> Partner with us</Link></li>
                        </ul>
                    </div>
                    <div className="flex-column d-flex align-items-center justify-content-cente footer-column">
                        <h6 className="footer-heading">Contact</h6>
                        <ul className="list-unstyled d-flex align-items-center justify-content-center flex-column">
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link target="_blank" style={{ color: "white" }} to={"https://www.google.com/maps"}><LocationOn /> 12/3, M.G. Road, Kolkata</Link></li>
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link target="_blank" style={{ color: "white" }} to={"tel:+91 6234567890"}><Phone /> +91 6234567890</Link></li>
                            <li className="footer-link pt-2 d-flex align-items-center justify-content-center"><Link target="_blank" style={{ color: "white" }} to={"mailto:infofoodzie@gmail.com"}><Email /> infofoodzie@gmail.com</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="lower-footer">
                <hr style={{ backgroundColor: "white", width: "80%", }} />
                <p>
                    Copyright © {new Date().getFullYear()} Foodzie. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer