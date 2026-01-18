import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./RestaurantPage.css";
import { useCallback, useEffect, useState } from "react";
import toastMessage from "../ToastMessage";
import KeywordBox from "../KeywordBox";
import RenderRatings from "../../Helper/RenderRatings";
import RestaurantPageExploreComponent from "./RestaurantPageExploreComponent";
import RestaurantPageReviewsComponent from "./RestaurantPageReviewsComponent";
import RestaurantPagePhotosComponent from "./RestaurantPagePhotosComponent";
import RestaurantPageMenuComponent from "./RestaurantPageMenuComponent";
import BackToTop from "../../Helper/backToTop";

const RestaurantPage = () => {
    const params = useParams();

    const [restaurant, setRestaurant] = useState({});
    const [reviews, setReviews] = useState([]);
    //eslint-disable-next-line
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [keywords, setKeywords] = useState([]);
    const [component, setComponent] = useState("Details");
    const [rating, setRating] = useState(0);

    const fetchRestaurant = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/getRestaurant/${params.restaurantId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (!data.success) {
                return toastMessage({ msg: data.message, type: "error" });
            }
            setRestaurant(data.restaurant);
            setReviews(data.reviews);

            //calculate rating
            const totalRating = data.reviews.reduce((accumulator, review) => {
                return accumulator + review.rating;
            }, 0) / data.reviews.length;

            setRating(totalRating);
            setLoading(false);

            const keywordsArray = data.restaurant.keywords.split(",");
            setKeywords(keywordsArray);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }, [params]);

    const renderComponent = () => {
        switch (component) {
            case "Explore":
                return <RestaurantPageExploreComponent name={restaurant.name} />
            case "Reviews":
                return <RestaurantPageReviewsComponent name={restaurant.name} reviews={reviews} />
            case "Photos":
                return <RestaurantPagePhotosComponent name={restaurant.name} img={restaurant.imgUrls} />
            case "Menu":
                return <RestaurantPageMenuComponent name={restaurant.name} img={restaurant.menuUrl} />
            default:
                return <RestaurantPageExploreComponent />
        }
    }

    useEffect(() => {
        BackToTop();
        fetchRestaurant();
        //eslint-disable-next-line
    }, [fetchRestaurant]);

    return (
        <>
            <Navbar />
            {
                loading ?
                    <div className="restaurant-page-loader">

                    </div>
                    :
                    <div className="restaurant-page container">
                        <section className="restaurant-page-image-container">
                            <div className="restaurant-page-banner-left-part mr-2">
                                <img className="restaurant-page-img" src={restaurant.imgUrls[0]} alt={restaurant.name} />
                            </div>
                            <div className="restaurant-page-banner-right-part">
                                <img className="restaurant-page-img mb-2" src={restaurant.imgUrls[1]} alt={restaurant.name} />
                                <img className="restaurant-page-img" src={restaurant.imgUrls[2]} alt={restaurant.name} />
                            </div>
                        </section>
                        <div className="restaurant-page-info">
                            <div className="restaurant-page-heading">
                                <h1>{restaurant.name}</h1>
                                <div className="restaurant-page-rating d-flex align-items-center justify-content-center">
                                    <RenderRatings rating={rating} />
                                    <span>({reviews.length} reviews)</span>
                                </div>
                            </div>
                            <div className="d-flex">
                                {
                                    keywords?.map((keyword, index) => {
                                        return <KeywordBox key={index} keyword={keyword} />
                                    })
                                }
                            </div>
                            <p className="mt-3">{restaurant.address}, {restaurant.city}- {restaurant.pincode}</p>
                            <p><span className={new Date().getTime() > restaurant.hours ? "text-danger" : "text-success"}>{new Date().getTime() > restaurant.hours ? "Closed now -  " : "Open now -  "}</span>{restaurant.hours}</p>

                            <div className="restaurant-page-main">
                                <div className="restaurant-page-main-options">
                                    <button className="pl-3" onClick={(e) => setComponent(e.target.innerText)}>Explore</button>
                                    <button onClick={(e) => setComponent(e.target.innerText)}>Reviews</button>
                                    <button onClick={(e) => setComponent(e.target.innerText)}>Photos</button>
                                    <button onClick={(e) => setComponent(e.target.innerText)}>Menu</button>
                                </div>
                                <div className="restaurant-page-main-details">
                                    {renderComponent()}
                                </div>
                            </div>
                        </div>
                    </div>

            }
            <Footer />
        </>

    )
}

export default RestaurantPage;