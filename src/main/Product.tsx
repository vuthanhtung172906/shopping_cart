import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import homeImg from '../images/comming-soon.png';
import { RootState } from '../redux/reducer';
import {
  CartItem,
  getProducts,
  onDecrementQuantity,
  onIncrementQuantity,
  onSendToCart,
  onShowDetailProduct,
  Product,
} from '../redux/service/product/ProductsSlice';
import { AppDispatch, useAppDispatch } from '../redux/store';
import './main.css';

const Products = () => {
  const { isLoading, error, products, quantity, currentProduct, cartItems } =
    useSelector((state: RootState) => state.products);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    console.log('In useEffect');
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleShowDetailProduct = (product: Product) => {
    dispatch(onShowDetailProduct({ product }));
  };

  const handleDecrementQuantity = () => {
    dispatch(onDecrementQuantity({ quantity }));
  };

  const handleIncrementQuantity = () => {
    dispatch(onIncrementQuantity({ quantity }));
  };

  const handleSendToCart = (e: any) => {
    e.preventDefault();
    const newItem: CartItem = {
      product: currentProduct[0],
      quantity: quantity,
    };

    dispatch(onSendToCart({ newItem }));
  };

  return (
    <>
      <div className="productContainer">
        <div className="navContainer">
          <div className="navLeft">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/reviews">Reviews</Link>
          </div>
          <div className="logo">
            <p>Beauty.bd</p>
          </div>

          <div className="navRight">
            <Link to="/checkout">
              <i className="fas fa-cart-plus"></i>
              <sup>{cartItems.length}</sup>
            </Link>
          </div>
        </div>
        <div className="productDetails">
          <div className="showProd">
            <div className="productImg">
              <img src={homeImg} alt="" />
            </div>

            <div>
              <h4>{currentProduct[0]?.productName}</h4>
              <p>{currentProduct[0]?.description} </p>
              <div className="computed">
                <div className="quantity">
                  <span
                    onClick={handleDecrementQuantity}
                    className={` decrease ${
                      quantity === 0 ? 'color-grey' : ''
                    }`}
                  >
                    -
                  </span>
                  {quantity}
                  <span onClick={handleIncrementQuantity} className="increase">
                    +
                  </span>
                </div>
                <div className="price">
                  <p>${currentProduct[0]?.price.toFixed(2)} </p>
                  <button className="addToCard" onClick={handleSendToCart}>
                    <i className="addIcon fas fa-cart-plus"></i>Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="productList">
            {products.slice(0, 5).map((product: Product) => (
              <div
                key={product.productId}
                className="productListItem"
                onClick={() => handleShowDetailProduct(product)}
              >
                <div className="productImgList">
                  <img src={product.imageUrl} alt="" />
                </div>
                <div>
                  <h5>{product.productName}</h5>
                  <p>{product.description}</p>
                  <div className="priceAndDetail">
                    <p>{product.price}</p>
                    <p>Detail</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
