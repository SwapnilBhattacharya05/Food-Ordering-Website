import { useUserContext } from '../../Context/UserContext';
import { useEffect, useState } from 'react';
import FormatPrice from '../../Helper/FormatPrice';
const ListCardItem = ({ index, foodItem }) => {

    const { addToCart, cartItems } = useUserContext();
    const [buttonToggle, setButtonToggle] = useState(false);

    useEffect(() => {
        const existingItem = cartItems.find((item => item._id === foodItem._id));
        setButtonToggle(!!existingItem);
    }, [cartItems, foodItem._id]);

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
    }

    return (
        <div className='list-item-card-container' key={index} >
            <div className='list-item-card-image-container'>
                <img src={foodItem.image} alt={foodItem} />
            </div>
            <div className='list-item-card-content-container'>
                <img src={foodItem.category === "Veg" ?
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1024px-Veg_symbol.svg.png"
                    : "https://packagingguruji.com/wp-content/uploads/2022/09/Old-Non-Veg-Logo.png"
                }
                    height={25}
                    width={25}
                    alt={foodItem.category}
                />
                <h5>{foodItem.name}</h5>
                <p style={{ marginBottom: 0 }}>
                    <FormatPrice price={foodItem.price} />
                </p>
                <p className='list-item-card-description'>{foodItem.description.slice(0, 120)}...</p>
                <button className='btn'
                    onClick={() => handleAddToCart(foodItem)}
                >
                    {
                        buttonToggle ? "Added" : "Add to Cart"
                    }
                </button>
            </div>
        </div>
    )
}

export default ListCardItem;