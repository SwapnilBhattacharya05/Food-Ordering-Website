import { ArrowUpward } from "@mui/icons-material";
import "./Footer.css";

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
                Footer
            </div>
            <div style={{ display: "flex", justifyContent: "center",alignItems:"center",flexDirection:"column" }}>

                <hr style={{ backgroundColor: "white", width: "80%", }} />
                <p>
                    Copyright © {new Date().getFullYear()} Foodzie. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer