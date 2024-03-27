import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Slider from "../Slider/Slider";
import FeaturedRoundedBoxes from "../Featured/FeaturedRoundedBoxes";
import Footer from "../Footer/Footer";

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
  ]

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
  ]

  return (
    <>
      <Navbar />

      <div className="home-page-heading-container">
        <img className="home-page-banner" src="img/banner.jpg" alt="banner" />
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

                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="why-card">

                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="why-card">

                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="why-card">

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
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Home;