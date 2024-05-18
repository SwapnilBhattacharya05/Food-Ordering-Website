import { CssBaseline, Box, ThemeProvider, TextField, Button, styled } from '@mui/material'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import app from '../../../firebase';
import React, { useEffect, useState } from 'react'
import { ColorModeContext, tokens, useMode } from '../../Admin/theme'
import RestaurantSidebar from '../RestaurantSidebar'
import RestaurantTopbar from '../RestaurantTopbar'
import AdminHeader from '../../Admin/Global/AdminHeader'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import toastMessage from '../../ToastMessage';
import { useNavigate } from 'react-router-dom';

const RestaurantExtras = () => {
    const [value, setValue] = useState(
        {
            name: '',
            price: '',
            image: '',
            description: '',
            category: '',
        }
    );

    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const navigate = useNavigate();

    const handleOnchange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (file) {
            uploadImage(file);
        }
    }, [file]);

    const uploadImage = (file) => {
        setIsUploading(true);
        const storage = getStorage(app);
        const filename = new Date().getTime() + file.name
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setValue((prev) => ({ ...prev, image: downloadURL }));
                setIsUploading(false);
                setFile(null);
            });
        });
    }

    const VisuallyHiddenInput = styled('input')({
        height: 1,
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const [theme, colorMode] = useMode()
    const colors = tokens(theme.palette.mode)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/addfooditem/661ee792d24015c93cc3f57f`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value)
            })

            const data = await response.json();

            if (!data.success) {
                return toastMessage({ msg: data.message, type: "error" })
            }

            toastMessage({ msg: data.message, type: "success" });

            setTimeout(() => {
                return navigate(`/RestaurantMenu`);
            }, 4000);
        } catch (err) {
            toastMessage({ msg: err.message, type: "error" });
        }
    }
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
                        mt='4.324rem'
                        mr='0.3125rem'
                    >
                        <Box
                            display="flex"
                            justifyContent='space-between'
                            alignItems='center'>

                            <AdminHeader title="MENU UPDATE"
                                subtitle="Add your Menus here"
                            />
                        </Box>
                        <Box ml="1.3rem">

                            <Box className="extras-container-dashboard-restaurant"
                                component="form"
                                autoComplete='off'
                                onSubmit={handleSubmit}
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
                                    height: 500,
                                }}
                            >

                                <TextField
                                    type='text'
                                    id='extras-restaurant-component'
                                    name='name'
                                    required
                                    label="Enter Food Name"
                                    variant="outlined"
                                    value={value.name}
                                    onChange={(e) => { handleOnchange(e) }}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        width: 600,
                                    }}
                                />
                                <TextField
                                    type='text'
                                    id='extras-restaurant-component'
                                    name='description'
                                    label="Enter Food Description"
                                    required
                                    variant="outlined"
                                    value={value.description}
                                    onChange={(e) => { handleOnchange(e) }}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        width: 600,
                                    }}
                                />
                                <TextField
                                    type='number'
                                    id='extras-restaurant-component'
                                    name='price'
                                    required
                                    label="Enter Food Price"
                                    variant="outlined"
                                    value={value.price}
                                    onChange={(e) => { handleOnchange(e) }}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        width: 600,
                                    }}
                                />
                                <TextField
                                    id="extras-restaurant-component"
                                    select
                                    name="category"
                                    required
                                    variant="outlined"
                                    label="Select Category"
                                    value={value.category}
                                    onChange={(e) => { handleOnchange(e) }}
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    sx={{
                                        width: 600,
                                    }}
                                >
                                    <option
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                        selected
                                        disabled
                                        value={""}
                                    >
                                        -- Select Category --
                                    </option>
                                    <option
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,

                                        }}
                                        value={"Veg"}
                                    >
                                        Veg
                                    </option>
                                    <option
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,

                                        }}
                                        value={"Non-Veg"}
                                    >
                                        Non-Veg
                                    </option>

                                </TextField>

                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        width: 600,
                                        padding: '0.5rem 1rem',
                                    }}
                                    disabled={isUploading}
                                >
                                    Upload Picture
                                    <VisuallyHiddenInput name="image" type="file" accept='image/*' onChange={(e) => uploadImage(e.target.files[0])} />
                                </Button>
                                <Button
                                    variant="contained"

                                    sx={{
                                        width: 600,
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#99f173',
                                        ":disabled": {
                                            backgroundColor: '#ace398',
                                        }
                                    }}

                                    type='submit'
                                    disabled={value.name === "" || value.description === "" || value.price === "" || value.category === "" || isUploading}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider >
        </>
    )
}

export default RestaurantExtras
