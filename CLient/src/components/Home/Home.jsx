import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import LocalDiningIcon from '@mui/icons-material/LocalDining';

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

  return (
    <>
      <Navbar />
      <div className="home-page-heading-container">
        <img className="home-page-banner" src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className="home-page-heading">
          <h1 className="home-page-h1">Welcome to Foodzie</h1>
          <span className="home-page-span">{text}</span>
          <Cursor cursorBlinking={false} cursorStyle={<LocalDiningIcon fontSize="medium" />} />
        </div>
      </div>
      <div className="container mt-4">
        <h4>User, what's on your mind?</h4>
        <div className="row mt-4">
          {
            imgArr.map((curElem, index) => {
              return (
                <div className="col-md-4 col-sm-6 col-lg-2" key={index}>
                  <figure className="category-figure-container">
                    <img className="category-img" src={curElem.link} alt={curElem.name} />
                    <figcaption className="category-figcaption mt-2">{curElem.name}</figcaption>
                  </figure>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  )
}

export default Home;