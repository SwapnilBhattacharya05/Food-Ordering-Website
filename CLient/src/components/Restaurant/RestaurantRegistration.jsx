import './RestaurantRegistration.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import app from '../../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toastMessage from '../ToastMessage';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';

const RestaurantRegistration = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [imageUpoading, setImageUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [imgFiles, setImgFiles] = useState([]);
    const [menuFile, setMenuFile] = useState([]);
    const [restaurantData, setRestaurantData] = useState({
        name: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
        cuisine: "Indian",
        keywords: "",
        hours: "",
        phone: "",
        email: "",
        password: "",
        conpassword: "",
        bankname: "",
        accountno: "",
        ifsc: "",
        imgUrls: [],
        menuUrl: "",
    });

    const navigate = useNavigate();

    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const filename = new Date().getTime() + image.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                }, (error) => {
                    console.log(error);
                    reject(error);
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                });
        })
    }

    const handleUpload = async (e) => {

        if (imgFiles && menuFile && imgFiles.length > 0 && (imgFiles.length + (restaurantData.imgUrls || []).length <= 6)) {
            setImageUploading(true);
            setImageUploadError(false);

            const allPromises = [];

            for (let i = 0; i < imgFiles.length; i++) {
                allPromises.push(storeImage(imgFiles[i]));
            }

            storeImage(menuFile).then((url) => {
                setMenuFile(url);
                setRestaurantData((prevData) => ({
                    ...prevData,
                    menuUrl: url
                }))
            }).catch((error) => {
                console.log(error);
                setImageUploadError("Failed to upload the menu image, (max 2MB allowed)");
            });

            Promise.all(allPromises).then((urls) => {
                setRestaurantData((prevData) => ({
                    ...prevData,
                    imgUrls: (prevData.imgUrls || []).concat(urls.slice(0, imgFiles.length)),
                }));
                setImageUploading(false);
            }).catch((error) => {
                console.log(error);
                setImageUploadError("Failed to upload the images, (max 2MB each allowed)");
                setImageUploading(false);
            });

        } else {
            setImageUploadError("You can only upload 3 images");
            setImageUploading(false);
        }

    }

    const handleDeleteImg = (index) => {
        setRestaurantData((prevData) => ({
            ...prevData,
            imgUrls: prevData.imgUrls.filter((_, i) => i !== index),
        }))
    }

    const handleMenuDelete = () => {
        setRestaurantData((prevData) => ({
            ...prevData,
            menuUrl: ""
        }))
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (restaurantData.password !== restaurantData.conpassword) {
            return toastMessage({ msg: "Passwords do not match", type: "error" });
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(restaurantData.email)) {
            return toastMessage({ msg: "Invalid Email", type: "error" });
        }

        if (restaurantData.phone.length !== 10) {
            return toastMessage({ msg: "Invalid Phone Number", type: "error" });
        }

        if (restaurantData.password.length < 8) {
            return toastMessage({ msg: "Password must be at least 8 characters long", type: "error" });
        }

        if (restaurantData.pincode.length !== 6) {
            return toastMessage({ msg: "Invalid Pincode", type: "error" });
        }

        if (!restaurantData.accountno.length >= 9 && restaurantData.accountno.length <= 18) {
            return toastMessage({ msg: "Invalid Account Number", type: "error" });
        }

        if (restaurantData.ifsc.length !== 11) {
            return toastMessage({ msg: "Invalid IFSC Code", type: "error" });
        }

        const keywords = restaurantData.keywords.split(",").map(keyword => keyword.trim()).join(", ");
        setRestaurantData(prevState => ({ ...prevState, imgUrls: prevState.imgUrls.concat(Array.from(imgFiles)), menuUrl: menuFile }));

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: restaurantData.name,
                address: restaurantData.address,
                city: restaurantData.city,
                pincode: restaurantData.pincode,
                state: restaurantData.state,
                cuisine: restaurantData.cuisine,
                keywords: keywords,
                hours: restaurantData.hours,
                phone: restaurantData.phone,
                email: restaurantData.email,
                password: restaurantData.password,
                conpassword: restaurantData.conpassword,
                bankname: restaurantData.bankname,
                accountno: restaurantData.accountno,
                ifsc: restaurantData.ifsc,
                imgUrls: restaurantData.imgUrls,
                menuUrl: restaurantData.menuUrl
            })
        });
        const data = await res.json();

        if (!data.success) {
            return toastMessage({ message: data.message, type: "error" });
        }

        toastMessage({ message: data.message, type: "success" });
        setTimeout(() => {
            navigate("/restaurant-login");
        }, 3700);
    }

    const handleOnChange = (e) => {
        setRestaurantData({ ...restaurantData, [e.target.name]: e.target.value });
        console.log(restaurantData);
    }

    return (
        <>
            <Navbar />
            <div className="container restaurant-registration-container mt-4">
                <form method='POST' onSubmit={handleFormSubmit} className="restaurant-registration-form">
                    <div className='text-center'>
                        <h1 className='text-center'>Restaurant Registration Form</h1>
                    </div>
                    <hr />
                    <h4>General Details</h4>
                    <hr />
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="name">Restaurant Name</label>
                            <br />
                            <input value={restaurantData.name} onChange={handleOnChange}
                                type="text" name="name" id="name"
                                className="reg-input" required
                                placeholder='Enter Restaurant Name'
                            />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="address">Address</label>
                            <br />
                            <input value={restaurantData.address}
                                onChange={handleOnChange} type="text" required
                                name="address" id="address" className="reg-input"
                                placeholder='Enter Address'
                            />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="city">City</label>
                            <br />
                            <input type="text" name="city"
                                id="city" className="reg-input"
                                placeholder='Enter City' required
                                value={restaurantData.city}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="state">State</label>
                            <br />
                            <input type="text" name="state"
                                id="state" className="reg-input" required
                                value={restaurantData.state} onChange={handleOnChange}
                                placeholder='Enter State'
                            />
                        </div>

                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="pincode">Pincode</label>
                            <br />
                            <input type="number" name="pincode"
                                id="pincode" className="reg-input"
                                value={restaurantData.pincode}
                                onChange={handleOnChange} required
                                placeholder='Enter Pincode'
                            />
                        </div>

                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="hours">Opening Hours</label>
                            <br />
                            <input type="text" name="hours"
                                id="hours" className="reg-input"
                                required
                                value={restaurantData.openingHours}
                                onChange={handleOnChange}
                                placeholder="Sun-Fri 11am-10pm"
                            />
                        </div>
                    </div>
                    <h4 className='mt-4'>Type of Food</h4>
                    <hr />
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="cuisine">Cuisine</label>
                            <br />
                            <select name="cuisine" id="cuisine" required className="reg-input" value={restaurantData.cuisine} onChange={handleOnChange}>
                                <option value="Indian" selected>Indian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Italian">Italian</option>
                                <option value="Continental">Continental</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Thai">Thai</option>
                                <option value="French">French</option>
                                <option value="Spanish">Spanish</option>
                            </select>
                        </div>

                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="keywords">Keywords<span>(Comma Separated)</span></label>
                            <br />
                            <input type="text" name="keywords"
                                value={restaurantData.keywords} onChange={handleOnChange}
                                id="keywords" className="reg-input" required
                                placeholder='Enter Keywords ex: veg, roll, biryani'
                            />
                        </div>
                    </div>

                    <h4 className='mt-4'>Images & Menu</h4>
                    <hr />
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="image">Images<span style={{ fontSize: "13px" }}>(at least 3 images and 2MB each)</span></label>
                            <br />
                            <input onChange={(e) => setImgFiles(e.target.files)} accept='image/*' type="file" required name="imgUrls[]" id="image" className="reg-input" multiple />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="menu">Menu</label>
                            <br />
                            <div className='d-flex align-items-center justify-content-center'>
                                <input onChange={(e) => setMenuFile(e.target.files[0])} accept='image/*' type="file" required name="menuUrl" id="menu" className="reg-input" />
                                <input className='btn btn-success-outline ml-3' disabled={imageUpoading || (menuFile && imgFiles.length < 3)} type='button' value={imageUpoading ? "Uploading..." : "Upload"} onClick={handleUpload} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {

                            restaurantData.imgUrls.length > 0 && restaurantData.imgUrls.map((url, index) => {
                                console.log(index, url)
                                return (
                                    <div className='col-lg-4 col-md-6 col-sm-12' key={index}>
                                        <img src={url} alt="img" className='img-thumbnail mt-2' style={{ width: "200px", borderRadius: "10px" }} />
                                        <button onClick={() => handleDeleteImg(index)} className='ml-3 btn btn-danger-outline'><Delete /></button>
                                    </div>
                                )
                            }).concat(
                                restaurantData.menuUrl &&
                                <div className='col-lg-4 col-md-6 col-sm-12'>
                                    <img src={restaurantData.menuUrl} alt="menu" className='img-thumbnail mt-2' style={{ width: "200px", borderRadius: "10px" }} />
                                    <button onClick={() => handleMenuDelete()} className='ml-3 btn btn-danger-outline'><Delete /></button>
                                </div>
                            )
                        }
                    </div>
                    <h4 className='mt-4'>Contact Details</h4>
                    <hr />
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="phone">Phone</label>
                            <br />
                            <input type="tel" name="phone"
                                value={restaurantData.phone} onChange={handleOnChange}
                                id="phone" className="reg-input" placeholder='Enter Phone Number' required
                            />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input value={restaurantData.email} onChange={handleOnChange}
                                type="email" name="email" id="email" className="reg-input" required
                                placeholder='Enter Email'
                            />
                        </div>
                    </div>

                    <h4 className='mt-4'>Bank Details</h4>
                    <hr />
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="bankname">Bank Name</label>
                            <br />
                            <input type="text" name="bankname" id="bankname"
                                className="reg-input" placeholder='Enter Bank Name'
                                value={restaurantData.bankName} onChange={handleOnChange} required
                            />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="accountno">Account Number</label>
                            <br />
                            <input type="number" name="accountno" id="accountno"
                                className="reg-input" placeholder='Enter Account Number' required
                                value={restaurantData.accountNumber} onChange={handleOnChange}
                            />
                        </div>

                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="ifsc">IFSC</label>
                            <br />
                            <input type="text" name="ifsc" id="ifsc"
                                value={restaurantData.ifscCode} onChange={handleOnChange}
                                className="reg-input" placeholder='Enter IFSC' required
                            />
                        </div>
                    </div>

                    <h4 className='mt-4'>Account Details</h4>
                    <hr />
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="loginid">Login ID<span>(Same as Email)</span></label>
                            <input type="email" value={restaurantData.email} readOnly name="loginid"
                                id="loginid" className="reg-input" placeholder='Enter Login ID'
                            />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                value={restaurantData.password} onChange={handleOnChange} id="password"
                                className="reg-input" placeholder='Enter Password' required autoComplete='password'
                            />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="password-div">
                                <input placeholder='Enter Password Again'
                                    onChange={handleOnChange}
                                    value={restaurantData.conpassword}
                                    type={showPassword ? "text" : "password"} name="conpassword"
                                    autoComplete="on"
                                    id="cpassword" required />
                                {
                                    showPassword ?
                                        <VisibilityIcon onClick={() => setShowPassword(!showPassword)} className="eye-icon" /> :
                                        <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} className="eye-icon" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="text-left">
                        <input style={{ width: "20%" }} type="submit" value={"Register"} className="mt-4 btn reg-submit" />
                    </div>
                </form >
            </div >
            <Footer />
        </>
    )
}

export default RestaurantRegistration;