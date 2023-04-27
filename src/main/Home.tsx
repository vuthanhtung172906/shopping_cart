import "./main.css";
import homeImg from "../images/comming-soon.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="homeContainer">
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
        <div className="homeBody">
          <img src={homeImg} />
        </div>
      </div>
    </>
  );
};

export default Home;
