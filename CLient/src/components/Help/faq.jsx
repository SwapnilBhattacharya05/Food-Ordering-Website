import React from "react";
import './faq.css';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CssBaseline, ThemeProvider } from "@mui/material"
import Navbar from "../Navbar/Navbar";
import { ColorModeContext, tokens, useMode } from "../Admin/theme.js";


const Faq = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    return (

        <>
            <Navbar />
            <ColorModeContext.Provider value={colorMode}>
                <CssBaseline />

                {/* FAQ PAGE CONTAINER */}
                <Box mt="120px" mb="120px" ml="20px">

                    {/* FAQ PAGE HEADING */}
                    <Box mb="30px">
                        <Typography variant="h4">General Questions</Typography>
                    </Box>
                    <Box className="faq-container">

                        {/* FAQ PAGE ACCORDION CONTAINER */}
                        <Box
                            sx={{
                                height: "400px",
                                display: "flex",
                            }}
                        >

                            {/* FAQ PAGE LEFT */}
                            <Box className="faq-box-left"
                                sx={{
                                    width: "50%",
                                    marginTop: "30px",
                                }}
                            >
                                {/* FAQ PAGE RIGHT */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography
                                            variant="h6"
                                        >1. How does the ordering process work?
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <span>
                                            Our ordering process is simple! Just browse through our menu,
                                            select the items you'd like to order, and add them to your cart, proceed to checkout,
                                            and follow the prompts to complete your order.
                                        </span>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography
                                            variant="h6"
                                        >2. What if there's an issue with my order?
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <span>
                                            If you encounter any issues with your order, such as missing items or order discrepancies,
                                            please contact our customer support team immediately.
                                            We'll work to resolve the issue promptly and ensure your satisfaction.

                                        </span>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography
                                            variant="h6"
                                        >3. How can I provide feedback about my experience?
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <span>
                                            Your feedback is valuable to us! You can leave a review on our website, or you can contact us directly
                                            via email or phone to share your thoughts, suggestions, or concerns.
                                        </span>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography
                                            variant="h6"
                                        >4. Is my personal information secure?
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <span>
                                            Yes, we take the security and privacy of your personal information very seriously. Our website employs
                                            industry-standard security measures to safeguard your data and ensure a safe ordering experience.
                                        </span>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography
                                            variant="h6"
                                        >5. How can I contact customer support?
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <span>
                                            You can reach our customer support team via phone, email, or through the contact form on our website
                                            and we're here to assist you with any inquiries or assistance you may need.

                                        </span>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography
                                            variant="h6"
                                        >6. Can I modify or cancel my order after it's been placed?
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <span>
                                            Once an order is placed, modifications or cancellations may be possible within a limited time frame.
                                            Please contact us as soon as possible if you need to make any changes to your order.
                                        </span>
                                    </AccordionDetails>
                                </Accordion>

                                {/* FAQ PAGE RIGHT */}
                            </Box>
                            <Box className="faq-box-right">
                                <img
                                    src="./img/confused-panda-faq.jpg"
                                    alt="faq-box-right-pic"
                                    height='92%'
                                    width='90%'
                                />


                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ColorModeContext.Provider >


        </>
    )
}
export default Faq