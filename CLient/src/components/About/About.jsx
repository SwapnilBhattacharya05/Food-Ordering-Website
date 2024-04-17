import React from "react";
import "./About.css"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const About = () => {

    return (
        <>
            <Navbar />

            <div className="about-page-top-hero mb-5">
                <div className="about-page-top-hero-left">
                    <p className="about-page-top-hero-left-texts">
                        Let's give your Tastebuds a Delight!
                    </p>
                </div>
                <div className="about-page-top-hero-right">
                    <img src="img/about-us-pic1.jpg" alt="img/about-us-pic1.jpg" />
                </div>
            </div>


            <div className="about-us-topic1">
                <div className="container">
                    <div className="row">
                        <div className="about-page-mission-left">
                            <br /><br />
                            <h2 className="mission" style={{
                                color: "rgb(128, 61, 59)"
                            }}
                            >
                                OUR MISSION
                            </h2>
                            <p className="about-page-mission-left-text">
                                Your satisfaction is our top priority. Our dedicated
                                support team is always on hand to assist you with any
                                queries or concerns, ensuring a seamless dining experience
                                from start to finish. We're committed to delivering excellence
                                in every bite. From sourcing fresh ingredients to ensuring
                                prompt delivery, we prioritize quality at every step of
                                the process. Join the Foodzie community today and embark on
                                a culinary journey like no other. Whether you're dining solo,
                                hosting a gathering, or simply craving a delicious meal,
                                we're here to satisfy your every craving.
                                Order now and experience the convenience of great food
                                delivered straight to your door.
                                Welcome to Foodzie ~ where every bite is a delight!
                            </p>
                        </div>
                        <div className="about-us-image2-right">
                            <img src="img/about-us-pic2.jpg" alt="img/about-us-pic2.jpg" /><br /><br />
                        </div>
                    </div>
                </div>
            </div>


            <div className="about-page-topic1">
                <div className="container">
                    <div className="row">
                        <div className="about-page-story-left">
                            <br /> <br /> <h2 className="mission" style={{
                                color: "rgb(128, 61, 59)"
                            }}
                            >
                                OUR STORY
                            </h2>
                            <p className="about-page-story-left-text">
                                Five diverse students found themselves united by an ambitious group project
                                - Our journey began with a simple idea: to revolutionize the way people
                                experience food. We saw an opportunity to connect food lovers with the finest
                                eateries in their area, all through the convenience of an online platform.
                                Late night meetings became brainstorming sessions, laughter echoing amidst the
                                textbooks. As the deadline approached, their dedication paid off.
                                The website seamlessly integrated a vast selection of restaurants
                                and cuisines to choose from, you'll never run out of options. Whether you're
                                craving comfort food or exploring new flavors, we've got you covered.
                                Presented to their professor, the project not only earned them accolades
                                but sparked conversations about potential real-world applications.
                                The students, once strangers, forged lasting bonds through this collaborative
                                venture, proving that academic challenges could transform into opportunities for both
                                learning and lifelong friendships.
                            </p>
                        </div>
                        <div className="about-us-image3-right">
                            <img src="img/about-us-pic3.jpg" alt="about-us" className="img3-about-uss" />
                        </div>
                    </div>
                </div>
            </div>


            <div className="meet-the-team mt-5">
                <div className="container">
                    <h1 className="meet-team-heading">MEET THE TEAM!</h1> <br /> <br />
                    <div className="row">

                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <img src="img/dipto_food.jpg" alt="img/about-us-pic" id="meet-the-team-pic" />
                            <h5>Dipto Das</h5>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <img src="img/swapnil_food.jpg" alt="img/about-us-pic" id="meet-the-team-pic" />
                            <h5>Swapnil Bhattacharya</h5>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <img src="img/meenakshi_food.jpg" alt="img/about-us-pic" id="meet-the-team-pic" />
                            <h5>Meenakshi Sarkar</h5>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-6 col-md-4 col-sm-12">
                            <img src="img/vaishnavi_food.jpg" alt="img/about-us-pic" id="meet-the-team-pic" />
                            <h5>Vaishnavi Anantha Krishnan</h5>
                        </div>
                        <div className="col-lg-6 col-md-4 col-sm-12">
                            <img src="img/sidhant_food.jpg" alt="img/about-us-pic" id="meet-the-team-pic" />
                            <h5>Siddhant Deora</h5>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}
export default About;