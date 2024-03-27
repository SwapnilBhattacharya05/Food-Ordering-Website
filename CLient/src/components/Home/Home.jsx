import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Slider from "../Slider/Slider";
import FeaturedRoundedBoxes from "../Featured/FeaturedRoundedBoxes";
import Footer from "../Footer/Footer";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useEffect, useState } from "react";
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DiscountIcon from '@mui/icons-material/Discount';
import ToastMessage from "../ToastMessage";
import { ToastContainer } from "react-toastify";
import { Email } from "@mui/icons-material";

const Home = () => {
  const typeWriterstrings = [
    "One cannot think well, love well, sleep well, if one has not dined well.",
    "Life is uncertain. Eat dessert first.",
    "Food is symbolic of love when words are inadequate.",
    "There is no sincerer love than the love of food.",
    "People who love to eat are always the best people.",
    "Good food is the foundation of genuine happiness.",
    "Food is not just eating energy. It's an experience.",
    "Food is our common ground, a universal experience.",
    "Food is the ingredient that binds us together."
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletter, setNewsletter] = useState({ email: "" });

  useEffect(() => {
    const testimonialsBody = document.querySelector(".testimonials-body");
    setTimeout(() => {
      testimonialsBody.style.opacity = 1;
    }, 500);
    return (() => {
      testimonialsBody.style.opacity = 0.5;
    })
  }, [testimonialIndex]);


  const [text] = useTypewriter({
    words: typeWriterstrings,
    loop: true,
  });

  const imgArr = [
    {
      name: "biriyani",
      link: 'https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/debomita-chatterjee20180516172647354.jpeg',
    },
    {
      name: "chinese",
      link: 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: "pizza",
      link: 'https://images.pexels.com/photos/9792476/pexels-photo-9792476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: "burger",
      link: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: "ice cream",
      link: 'https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: "Momo",
      link: 'https://images.pexels.com/photos/7363682/pexels-photo-7363682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    }
  ]

  const cuisines = [
    {
      name: "Indian",
      link: "https://cdn.vox-cdn.com/thumbor/aNM9cSJCkTc4-RK1avHURrKBOjU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/20059022/shutterstock_1435374326.jpg",
    },
    {
      name: "Chinese",
      link: "https://www.hotelmousai.com/blog/wp-content/uploads/2021/11/Chinise-food.jpg",
    },
    {
      name: "Italian",
      link: "https://static.wixstatic.com/media/2cbff6_ac782b0eaff94ec0881f0299fdb76ab6~mv2.jpg/v1/fill/w_600,h_466,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2cbff6_ac782b0eaff94ec0881f0299fdb76ab6~mv2.jpg",
    },
    {
      name: "Continental",
      link: "https://d3ox4wjkl7mf3m.cloudfront.net/feed_story/step/MtTZMjAM1L9qNddeSWQCX56XVJxH6BOnlB2uCc3q.jpeg",
    },
    {
      name: "Mexican",
      link: "https://images.immediate.co.uk/production/volatile/sites/30/2022/10/Pork-carnitas-b94893e.jpg?quality=90&resize=556,505",
    },
    {
      name: "Japanese",
      link: "https://www.tastingtable.com/img/gallery/20-japanese-dishes-you-need-to-try-at-least-once/l-intro-1664219638.jpg",
    }
  ];

  const newlyAdded = [
    {
      name: "Pizza",
      link: "https://images.pexels.com/photos/9792476/pexels-photo-9792476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Burger",
      link: "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Ice cream",
      link: "https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Momo",
      link: "https://images.pexels.com/photos/7363682/pexels-photo-7363682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Biryani",
      link: "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/debomita-chatterjee20180516172647354.jpeg",
    }
  ];

  const testimonials = [
    {
      name: "Dhruv Kumar",
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Foodzie has truly revolutionized the way I order food. With its vast array of restaurants and cuisines, I can satisfy any craving at any time. Plus, the seamless ordering process and timely delivery make it my go- to choice for delicious meals!",
    },
    {
      name: "Akash Gupta",
      img: "https://images.pexels.com/photos/899357/pexels-photo-899357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "As a busy professional, I rely on Foodzie to save me time and provide quality meals. Whether it's a quick lunch during work hours or a hearty dinner after a long day, Foodzie never disappoints. The variety of options ensures I never get bored!",
    },
    {
      name: "Rohit Das",
      img: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=1506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Being a foodie, I'm always on the lookout for new and exciting dining experiences. Foodzie has introduced me to hidden gems and local favorites that I wouldn't have discovered otherwise. It's like having a personal food guide at my fingertips!",
    },
    {
      name: "Deepshika Singh",
      img: "https://images.unsplash.com/photo-1548819611-fc0f1732d402?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Foodzie has made ordering food for gatherings and parties a breeze. With its group ordering feature, I can easily coordinate meals for friends and family without the hassle of individual orders. It's convenient, efficient, and always a hit with everyone!",
    },
    {
      name: "Ankita Rathore",
      img: "https://images.unsplash.com/photo-1543871595-e11129e271cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Being health-conscious, I appreciate Foodzie's diverse range of healthy options. From salads to gluten-free meals, I can always find nutritious choices that align with my dietary preferences. It's reassuring to have a platform that caters to my health needs without compromising on taste!",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newsletter.email)) {
      ToastMessage({ msg: "Thank you for subscribing to our newsletter!", type: "success" });
    } else {
      ToastMessage({ msg: "Invalid Email", type: "error" });
    }
  }

  const handleOnChange = (e) => {
    setNewsletter({ ...newsletter, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Navbar />

      <div className="home-page-heading-container">
        <img className="home-page-banner" src="img/banner.png" alt="banner" />
        <div className="home-page-heading">
          <h1 className="home-page-h1">Welcome to Foodzie</h1>
          <span className="home-page-span">{text}</span>
          <Cursor cursorBlinking={false} cursorStyle={<LocalDiningIcon fontSize="medium" />} />
        </div>
      </div>

      <main className="container mt-4">
        <div className="featured-iteams">
          <h4>User, what's on your mind?</h4>
          <FeaturedRoundedBoxes items={imgArr} />
        </div>

        <hr />

        <div className="mt-4 recommend">
          <h4>Recommended Restaurants for You</h4>
          <p>Find the best restaurants that suit you</p>
          <Slider img={imgArr} />
        </div>
        <hr />

        <div className="mt-4 featured-cuisines">
          <h4>Featured Cuisines</h4>
          <p>Explore some of our most popular cuisines selected just for you</p>
          <FeaturedRoundedBoxes items={cuisines} />
        </div>
        <hr />

        <div className="mt-4 newly-added">
          <h4>Newly Added foods</h4>
          <p>Do not miss out on these recently added items selected just for you</p>
          <Slider img={cuisines} />
        </div>

        <hr />

        <div className="mt-4 why-container">
          <h4>Why Foodzie?</h4>
          <div className="why">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="why-card">
                  <div className="why-card-circle">
                    <KebabDiningIcon fontSize="large" />
                  </div>
                  <h6 className="why-card-h6 px-2">Wide Variety of Cuisines</h6>
                  <p className="why-card-p px-2">Discover a world of culinary delights from traditional Indian flavors to international favorites, there's something to tantalize every taste bud.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="why-card">
                  <div className="why-card-circle">
                    <TagFacesIcon fontSize="large" />
                  </div>
                  <h6 className="why-card-h6 px-2">Convenient Ordering Experience</h6>
                  <p className="why-card-p px-2">
                    <p className="why-card-p px-2">Say goodbye to the hassles of traditional food ordering, our user-friendly platform ensures effortless ordering at your fingertips.</p></p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="why-card">
                  <div className="why-card-circle">
                    <ThumbUpIcon fontSize="large" />
                  </div>
                  <h6 className="why-card-h6 px-2">Quality Assurance</h6>
                  <p className="why-card-p px-2">We prioritize quality above all else. Each restaurant in our network undergoes stringent quality checks to ensure that only the finest food reaches your doorstep.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="why-card">
                  <div className="why-card-circle">
                    <DiscountIcon fontSize="large" />
                  </div>
                  <h6 className="why-card-h6 px-2">Special Offers and Discounts</h6>
                  <p className="why-card-p px-2">Indulge in delicious meals without breaking the bank, thanks to Foodzie's irresistible offers and discounts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* testimonials */}
        <div className="mt-4 testimonials">
          <h4>Testimonials</h4>
          <p>What our customers say about us</p>
          <div className="testimonials-container">
            <button className="testimonials-left-btn" onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)}>&lt;</button>
            <div className="testimonials-body">
              <div className="text-part">
                <p>"{testimonials[testimonialIndex].text}"</p>
                <p style={{ fontWeight: "bold", paddingLeft: "10px" }}>- {testimonials[testimonialIndex].name}</p>
              </div>
              <div className="image-part">
                <img src={testimonials[testimonialIndex].img} alt="testimonials" />
                <div className="round" >
                  <FormatQuoteIcon />
                </div>
              </div>
            </div>
            <button className="testimonials-right-btn" onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}>&gt;</button>
          </div>
        </div>

        <div className="newsletter text-center mt-5 mb-5">
          <h4><Email fontSize="large" /> Subscribe to our newsletter</h4>
          <p>Get exclusive offers, discounts, and inspiration straight to your inbox</p>
          <form method="POST" onSubmit={handleSubmit}>
            <input required name="email" onChange={handleOnChange} value={newsletter.email} type="email" placeholder="Enter your email" className="newsletter-input" />
            <button type="submit" className="p-2 newsletter-btn btn">Subscribe</button>
          </form>
        </div>
        <ToastContainer />
      </main>

      <Footer />
    </>
  )
}

export default Home;