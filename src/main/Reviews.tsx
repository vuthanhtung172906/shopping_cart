import homeImg from "../images/comming-soon.png";
import "./main.css";
import { Link } from "react-router-dom";

const Reviews = () => {
  return (
    <>
      <div className="reviewsContainer">
        <div className="navContainer">
          <div className="navLeft">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/reviews">Reviews</Link>
          </div>
          <div className="logo">
            <p>Beauty.bd</p>
          </div>
        </div>
        <div className="reviewBody">
          <img src={homeImg} />
        </div>
      </div>
    </>
  );
};

export default Reviews;
