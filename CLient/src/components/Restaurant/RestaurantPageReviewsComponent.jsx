import "./RestaurantPageReviewsComponent.css";
import { Rating } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort';
import { useState } from "react";

const RestaurantPageReviewsComponent = ({ name, reviews }) => {
  const [sortValue, setSortValue] = useState('newest');
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  switch (sortValue) {
    case 'newest':
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      reviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'highRating':
      reviews.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowRating':
      reviews.sort((a, b) => a.rating - b.rating);
      break;
    default:
      break;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }

  const handleOnChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className='container review-container mt-3'>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>{name} Reviews ({reviews.length})</h3>
        <div className="d-flex align-items-center">
          <SortIcon fontSize="medium" />
          <select style={{ border: "none", outline: "none" }} className="review-sort" onChange={handleSortChange} value={sortValue}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highRating">Highest Rating</option>
            <option value="lowRating">Lowest Rating</option>
          </select>
        </div>
      </div>
      {/* <form method="post" action="" className="review-form mb-3" onSubmit={handleFormSubmit}>
        <label htmlFor="comment" style={{ fontSize: "20px" }}>Enter Your Review</label>
        <br />
        <input required type="text" className="review-input" name="comment" id="review" onChange={handleOnChange} value={comment} placeholder="Write Your Review" />
        <br />
        <label htmlFor="image" style={{ fontSize: "20px" }}>Upload Image(optional)</label>
        <br />
        <input type="file" className="review-input" accept="image/*" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} />
        <button className="review-btn btn" type="submit">Submit</button>
      </form> */}
      {
        reviews.length ?
          reviews.map((review, index) => {
            return (
              <div key={index} className="review-box">
                <div className="d-flex align-items-center">
                  <img src={review.user.image} alt={"display-img"} style={{ width: "50px", height: "50px", borderRadius: "50%" }}></img>
                  <div className="px-3">
                    <h5>{review.user.firstName + " " + review.user.lastName}</h5>
                    <span>{Intl.DateTimeFormat('en-IN').format(new Date(review.createdAt))}</span>
                  </div>
                </div>
                <Rating className="mt-2" name="read-only" value={review.rating} readOnly />
                <div className="review-main-content mt-2">
                  <p>{review.comment}</p>
                  {
                    review.image !== "" && <img src={review.image} alt="review" style={{ width: "15rem", borderRadius: "10px" }}></img>
                  }
                </div>
              </div>
            )
          }) : <img
            src="https://firebasestorage.googleapis.com/v0/b/foodzie-bcbf4.appspot.com/o/no-review.png?alt=media&token=e0c75b61-c440-4174-b59d-9e3abd77c4d0"
            alt="No reviews"
            style={{ display: "block", margin: "0 auto", objectFit: "cover" }}
          />
      }
    </div>
  )
}

export default RestaurantPageReviewsComponent