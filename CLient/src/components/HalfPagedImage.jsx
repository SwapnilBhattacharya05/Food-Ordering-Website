import React from 'react'
import { Link } from 'react-router-dom'

const HalfPagedImage = ({ image = 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png', page }) => {

    const quote = page === 'login' ? 'Welcome to the flavor-filled login zone! | Type in your secret recipe! 🍽️🔒' : "Join our foodie family! | Sign up now and let the deliciousness begin! 🍽️🎉"; const quoteArr = quote.split("|");

    return (
        <section className='half-paged'>
            <figure className='half-paged-image-container'>
                <Link to={"/"}><h1 className='half-paged-image-heading' style={{ color: page === 'login' ? 'white' : 'black', backdropFilter: 'blur(10px)',zIndex: 2 }}>Foodzie</h1></Link>
                <div className='half-paged-quote'>
                    <p style={{ color: 'white', backdropFilter: 'blur(10px)',zIndex: 2 }}>{quoteArr[0]}</p>
                    <p style={{ color: 'white', backdropFilter: 'blur(10px)',zIndex: 2 }}>{quoteArr[1]}</p>
                </div>
                <img id='half-paged-image' src={image} alt={image} />
            </figure>
        </section>
    );
}

export default HalfPagedImage