import React, { useRef } from "react";
import "./Slider.css";
import GridCard from "../../Helper/GridCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Slider = ({ featuredRestaurants = [], featuredDishes = [] }) => {
    const sliderRef = useRef(null);

    const handleLeftSlide = () => {
        const slider = sliderRef.current;
        if (slider) {
            const width = slider.offsetWidth;
            slider.scrollLeft -= width;
        }
    };

    const handleRightSlide = () => {
        const slider = sliderRef.current;
        if (slider) {
            const width = slider.offsetWidth;
            slider.scrollLeft += width;
        }
    };

    const dataToDisplay = featuredRestaurants.length ? featuredRestaurants : featuredDishes;
    const searchBy = featuredRestaurants.length ? "Restaurants" : "Dishes"
    return (
        <div className="slider-container container-fluid mt-3">
            <button id="left-slider-btn" onClick={handleLeftSlide}>
                <p style={{ marginBottom: 0 }}><ArrowBackIosIcon /></p>
            </button>
            <button id="right-slider-btn" onClick={handleRightSlide}>
                <p style={{ marginBottom: 0 }}><ArrowForwardIosIcon /></p>
            </button>
            <div className="slider" ref={sliderRef}>
                {dataToDisplay.map((item, index) => (
                    <GridCard searchBy={searchBy} data={item} key={item._id || index} />
                ))}
            </div>
        </div>
    );
};

export default Slider;
