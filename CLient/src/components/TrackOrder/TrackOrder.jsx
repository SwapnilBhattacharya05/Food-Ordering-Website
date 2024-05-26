import { useEffect, useRef, useState } from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./TrackOrder.css";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import FormatPrice from "../../Helper/FormatPrice";
import { Step, StepContent, Stepper, Typography, StepLabel, Button, Box } from "@mui/material";
import { useMode, tokens, colorMode } from "../Admin/theme";
const TrackOrder = () => {

    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);

    const { isLoading, fetchOrder, orderDetails } = useOrderContext();
    const params = useParams();

    useEffect(() => {
        fetchOrder(params.orderId);
        // eslint-disable-next-line
    }, [params.orderId])

    const steps = [
        {
            label: "Pending",
            description: "The order has not yet been acknowledged by the restaurant."
        },
        {
            label: "Confirmed",
            description: "The restaurant has acknowledged and accepted the order."
        },
        {
            label: "Preparing",
            description: "The restaurant is currently preparing the food."
        }, {
            label: "Ready for Pickup",
            description: "The food is ready for pickup at the restaurant."
        },
        {
            label: "Out for Delivery",
            description: "The food is on its way to the customer."
        },
        {
            label: "Delivered",
            description: "The order has been delivered to the customer."
        },
        {
            label: "Completed",
            description: "The order has been successfully completed, Enjoy your food."
        }
    ];

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (orderDetails?.status) {
            switch (orderDetails?.status) {
                case "pending":
                    setActiveStep(0);
                    break;
                case "confirmed":
                    setActiveStep(1);
                    break;
                case "preparing":
                    setActiveStep(2);
                    break;
                case "ready_for_pickup":
                    setActiveStep(3);
                    break;
                case "out_for_delivery":
                    setActiveStep(4);
                    break;
                case "delivered":
                    setActiveStep(5);
                    break;
                case "completed":
                    setActiveStep(6);
                    break;
                default:
                    break;
            }
        }
    }, [orderDetails?.status]);

    return (
        <>
            <Navbar />
            {
                isLoading ? <div className="track-order-page-loader"></div> :
                    <div className='track-order-page-container container'>
                        <div className="track-order-page-left-container">
                            <h2 className="text-center">Order Details</h2>
                            <div className="order-details">
                                <h6>Order Id: #{orderDetails?._id}</h6>
                                <p>Ordered at: {new Date(orderDetails?.createdAt).toLocaleTimeString()}</p>
                                <p>From : {orderDetails?.restaurant?.name}, {orderDetails?.restaurant?.address.slice(0, 70)}</p>
                                <p>To : {orderDetails?.address}</p>
                            </div>
                            <table className="order-items-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderDetails?.foodItems?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td><img src={item.image} alt={item.name} /></td>
                                                    <td>{item.name} X {item.quantity}</td>
                                                    <td>{item.price * item.quantity}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <h5 className="mt-3">Total Bill: {<FormatPrice price={orderDetails?.totalAmount} />}</h5>
                        </div>
                        <div className="track-order-page-right-container">
                            <h2 className="text-center">Order Status:</h2>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((step, index) => (
                                    <Step key={step.label} sx={
                                        {
                                            '& .light-mode .MuiStepLabel-label': {
                                                color: `${colors.grey[100]} !important`
                                            },
                                            '& .dark-mode .MuiStepLabel-label': {
                                                color: `${colors.grey[100]} !important`
                                            },
                                        }
                                    }>
                                        <StepLabel
                                            optional={
                                                index === 6 ? (
                                                    <Typography variant="caption">Last step</Typography>
                                                ) : null
                                            }
                                        >
                                            {step.label}
                                        </StepLabel>
                                        <StepContent>
                                            <Typography>{step.description}</Typography>
                                            <Box sx={{ mb: 2 }} hidden>
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ mt: 1, mr: 1 }}
                                                        hidden
                                                    >
                                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                    </Button>
                                                </div>
                                            </Box>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                    </div>
            }
            <Footer />
        </>
    )
}

export default TrackOrder;