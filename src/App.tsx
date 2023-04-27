import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./main/Home";
import Products from "./main/Product";
import Reviews from "./main/Reviews";
import Checkout from "./checkout/Checkout";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
