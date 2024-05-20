import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import FormatPrice from './FormatPrice';
import Star from '@mui/icons-material/Star';
import { useUserContext } from '../Context/UserContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CartQuantityToggle from '../Helper/CartQuantityToggle';

const GridCard = ({ data, index, searchBy }) => {
    const { mode } = useAppContext();
    const { addToCart, cartItems } = useUserContext();
    const [buttonToggle, setButtonToggle] = useState(false);

    useEffect(() => {
        const existingItem = cartItems.find(item => item._id === data._id);
        setButtonToggle(!!existingItem);
    }, [cartItems, data._id]);

    // Check if data is defined and has the necessary properties
    if (!data) {
        console.error('GridCard component received undefined data.');
        return null;
    }

    if (searchBy === 'Restaurants') {
        var address = data.address ? data.address.split(',') : [];
        var imgUrl = (data.imgUrls && data.imgUrls.length > 0) ? data.imgUrls[0] : 'https://img.freepik.com/free-photo/textured-background-white-tone_53876-128610.jpg';
        var keywords = data.keywords ? data.keywords : [];
    }

    const handleAddToCart = (data) => {
        const differentRestaurant = cartItems.find(item => item.restaurant._id !== data.restaurant._id);
        if (differentRestaurant) {
            const confirm = window.confirm('Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?')
            if (confirm) {
                addToCart(data);
                setButtonToggle(true);
            }
        } else {
            addToCart(data);
            setButtonToggle(true);
        }

    };

    return (
        searchBy === "Restaurants" ?
            data._id ? (
                <Link to={`/restaurant/${data._id}`} key={index} style={mode === 'light-mode' ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'white' }}>
                    <div key={index} className='grid-card'>
                        <figure className='card-image-container'>
                            <img src={imgUrl} alt={data.name} />
                            <div className='figcaption-container'>
                                <figcaption className='card-figcaption'>{data.name}</figcaption>
                                <div className='card-rating-container'
                                    style={data.rating === 0 ?
                                        {
                                            marginBottom: 0, color: 'green',
                                            backgroundColor: 'white', border: '1px solid green'
                                        }
                                        : null
                                    }
                                >
                                    {
                                        data.rating === 0 ?
                                            <p style={{ marginBottom: 0, color: 'green' }}>New</p>
                                            :
                                            <p style={{ marginBottom: 0 }}>
                                                {data.rating}
                                            </p>
                                    }
                                    <Star fontSize='small' className='card-star' />
                                </div>
                            </div>
                        </figure>
                        <div className='grid-card-footer'>
                            <p>{keywords.slice(0, 20)}...</p>
                            <p><FormatPrice price={1000} /> for two</p>
                        </div>
                        <p className='grid-card-address'>
                            {
                                address.length === 1 ? `${address[0]}, ${data.city}` : `${address[1]}, ${data.city}`
                            }
                        </p>
                    </div>
                </Link>
            ) : null
            :
            data.restaurant && data.restaurant._id ? (
                <div key={index} className='grid-card'>
                    <div className='grid-card-item-container'>
                        <Link to={`/restaurant/${data.restaurant._id}`}>
                            <div className='grid-card-header'>
                                <h6>By {data.restaurant.name}</h6>
                                <p style={{ marginBottom: 0 }}><ArrowForwardIcon /></p>
                            </div>
                        </Link>
                        <div className='grid-card-item-image-container'>
                            <img src={data.image} alt={data.name} />
                        </div>
                        <div className='grid-card-item-details mt-2'>
                            <img
                                src={data.category === "Veg" ?
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1024px-Veg_symbol.svg.png"
                                    : "https://packagingguruji.com/wp-content/uploads/2022/09/Old-Non-Veg-Logo.png"
                                }
                                height={25} width={25}
                                alt="category"
                            />
                            <p style={{ marginBottom: 0 }}>{data.name}</p>
                        </div>
                        <div className='grid-card-item-footer mt-1'>
                            <p style={{ paddingLeft: "0.6rem", fontSize: "1.3rem" }}>
                                <FormatPrice price={data.price} />
                            </p>
                            <button className={'btn'} style={{ height: "2.5rem", width: "6.5rem", fontSize: "0.8rem" }}
                                onClick={() => handleAddToCart(data)}
                            >
                                {
                                    buttonToggle ? "Added" : "Add To Cart"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            ) : null
    );
}

export default GridCard;
