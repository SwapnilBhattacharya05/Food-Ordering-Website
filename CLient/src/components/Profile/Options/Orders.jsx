import React, { useState } from 'react'
import { tokens, useMode } from '../../Admin/theme'
import { Box, Typography, Button, IconButton, TextField, Rating } from "@mui/material";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../../firebase';
import "../Profile.css"
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useUserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import toastMessage from '../../ToastMessage';

const Orders = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const { orderHistory } = useUserContext();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [reviewData, setReviewData] = useState({
        rating: 0,
        comment: "",
    });

    const uploadImage = async (file) => {
        const storage = getStorage(app);
        const filename = new Date().getTime() + file.name;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, (error) => {
            console.log(error);
        },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFile(downloadURL);
                    console.log('File available at', downloadURL);
                });
            }
        );
    }

    const handleOnChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    }

    const postReview = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/postReview/${orderHistory[0].restaurant._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    restaurant: orderHistory[0].restaurant._id,
                    rating: reviewData.rating,
                    comment: reviewData.comment,
                    image: file ? file : ""
                }),
            });
            const data = await response.json();

            if (!data.success) {
                return toastMessage({ msg: data.message, type: "error" });
            }

            toastMessage({ msg: data.message, type: "success" });
            setReviewData({ rating: 0, comment: "" });
        } catch (err) {
            toastMessage({ msg: err.message, type: "error" });
            console.log(err);
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: 415,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                <Box className="row"
                    sx={{
                        ml: 5,
                    }}
                >
                    {
                        orderHistory.map((value, index) => {
                            const { _id, status, foodItems, totalAmount, createdAt } = value;
                            const { name, address, imgUrls } = value.restaurant;

                            return (
                                <Box key={index} className='profile-orders-list-main'
                                    sx={{
                                        mt: 2,
                                    }}
                                >
                                    <Box className='profile-option-orders'
                                        key={_id}
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <Box className='profile-option-orders-left'
                                            sx={{
                                                width: "30%",
                                            }}
                                        >
                                            <img
                                                src={imgUrls[0]}
                                                height={169}
                                                width="100%"
                                                alt="Some Food was here"
                                            />

                                        </Box>
                                        <Box className='profile-option-orders-right'
                                            sx={{
                                                width: "70%",
                                                textAlign: "left",
                                                textIndent: "10px",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="h5"
                                                        sx={{
                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        {name}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        fontSize: 13,
                                                        mr: 1,
                                                    }}
                                                >
                                                    {
                                                        status !== "completed" ? "Not delivered yet" :
                                                            <>
                                                                Delivered&nbsp;on:&nbsp;{new Date(createdAt).toLocaleTimeString()}&nbsp;
                                                                <CheckCircleIcon color="success" />
                                                            </>
                                                    }
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: 200,
                                                }}
                                            >
                                                <Typography variant="h6"
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {address}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: 600,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    fontSize: 13.5,
                                                }}
                                            >
                                                ORDER&nbsp;#{_id}&nbsp;|&nbsp;{new Date(createdAt).toDateString()}
                                            </Box>
                                            <Divider
                                                sx={{
                                                    mt: 1,
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    mt: 0.5,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        fontSize: 13.5,
                                                    }}
                                                >
                                                    {foodItems.map((value) => {
                                                        return value.name + " x " + value.quantity + " | "
                                                    })}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        mr: 1.5,
                                                    }}
                                                >
                                                    Total&nbsp;Paid&nbsp;₹&nbsp;{totalAmount}
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    variant="outlined"
                                                    color="warning"
                                                    sx={{
                                                        backgroundColor: "transparent",
                                                    }}
                                                    onClick={() => { navigate(`/restaurant/${value.restaurant._id}`) }}
                                                >REORDER
                                                </Button>
                                                {
                                                    status !== "completed" ?
                                                        <Button variant="contained"
                                                            color='success'
                                                            sx={{
                                                                ml: 1.5,
                                                                backgroundColor: colors.greenAccent[500],
                                                            }}
                                                            onClick={() => { navigate(`/track-order/${value._id}`) }}
                                                        >
                                                            Track Order
                                                        </Button> :
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            sx={{
                                                                ml: 1.5,
                                                                backgroundColor: colors.greenAccent[500],
                                                            }}
                                                            data-toggle='modal'
                                                            data-target='#reviewModal'
                                                        >
                                                            Post Review
                                                        </Button>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )

                        })

                    }
                </Box>
            </Box>

            {/* <!-- REVIEW MODAL --> */}
            <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ minHeight: "350px" }}>
                            <Box className="profile-option-address-modal-container"
                                component="form"
                                autoComplete='off'
                                sx={{
                                    '&.MuiTextField-root': {
                                        m: 1,
                                        width: '25ch'
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: `${colors.greenAccent[500]} !important`,
                                        }
                                    },
                                    '& .Mui-focused fieldset': {
                                        borderColor: `${colors.greenAccent[500]} !important`,
                                    },
                                    ' & label': {
                                        color: `${colors.greenAccent[500]} !important`,
                                    },
                                    ' & label.Mui-focused': {
                                        color: `${colors.greenAccent[600]} !important`,
                                    },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: 200,
                                }}
                            >
                                <Box className="profile-option-address-modal-components"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>

                                    {/* ROW1 */}
                                    <Typography variant="h6"
                                        sx={{
                                            textAlign: "left",
                                        }}
                                    >
                                        Rating
                                    </Typography>
                                    <Rating size='large' name="rating" value={reviewData.rating} onChange={handleOnChange} />
                                    {/* ROW2 */}
                                    <Typography variant="h6"
                                        sx={{
                                            textAlign: "left",
                                        }}
                                    >
                                        Image(2mb max)
                                    </Typography>
                                    <div className='d-flex justify-content-center'>
                                        <input type="file" name='file' id='file' accept="image/*"
                                            onChange={(e) => { setFile(e.target.files[0]) }}
                                        />
                                        <input type="button" value={"Upload"}
                                            className='btn'
                                            onClick={() => { uploadImage(file) }}
                                        />
                                    </div>
                                    {/* ROW3 */}
                                    <Typography variant="h6"
                                        sx={{
                                            textAlign: "left",
                                        }}
                                    >
                                        Comment
                                    </Typography>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        rows={4}

                                        name='comment'
                                        value={reviewData.comment}
                                        onChange={handleOnChange}
                                    />
                                </Box>
                            </Box>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                onClick={() => { postReview() }}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders