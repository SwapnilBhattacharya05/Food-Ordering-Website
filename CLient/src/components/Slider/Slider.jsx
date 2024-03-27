import React, { useRef } from "react";
import "./Slider.css";

const Slider = ({ img }) => {
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

    return (
        <div className="slider-container container-fluid mt-3">
            <button id="left-slider-btn" onClick={handleLeftSlide}>
                <p>&lt;</p>
            </button>
            <button id="right-slider-btn" onClick={handleRightSlide}>
                <p>&gt;</p>
            </button>
            <div className="slider" ref={sliderRef}>
                {
                    img.map((currElem, index) => (
                        <div className="card" key={index}>
                            <figure className="img-figure">
                                <img className="slider-img" src={currElem.link} alt={currElem.name} />
                            </figure>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Slider;
