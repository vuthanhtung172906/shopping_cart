import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../main/main.css';
import homeImg from '../images/comming-soon.png';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppDispatch } from '../redux/store';
import { RootState } from '../redux/reducer';
import {
  CartItem,
  fetchProductsAsync,
  onDecrementProductCheckout,
  onDeleteProduct,
  onIncrementProductCheckout,
} from '../redux/service/product/ProductsSlice';
import { createLanguageService } from 'typescript';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { cartItems, quantity } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const shippingCost = 10;

  const handleDecrementQuantityCheckout = (id: string) => {
    dispatch(onDecrementProductCheckout({ id }));
  };
  const handleIncrementProductCheckout = (id: string) => {
    dispatch(onIncrementProductCheckout({ id }));
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(onDeleteProduct({ id }));
  };

  const subtotal = cartItems.reduce(
    (acc, curr) => (acc += curr.product.price * curr.quantity),
    0
  );

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
            <i className="fas fa-cart-plus"></i>
            <sup>{cartItems.length}</sup>
          </div>
        </div>
        <div className="productBody">
          <div className="checkoutContainer">
            <h3 className="myShoppingCart">My Shopping Cart</h3>

            <div className="shoppingCartDetail">
              <div className="listCard">
                {cartItems.length > 0 ? (
                  cartItems.map((item: CartItem) => (
                    <div
                      key={item.product.productId}
                      className="productListItem"
                    >
                      <div className="productImgList">
                        <img src={homeImg} alt="" />
                      </div>
                      <div className="listOrder">
                        <div>
                          <h6>{item.product.productName}</h6>
                          <div
                            onClick={() =>
                              handleDeleteProduct(item.product.productId)
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </div>
                        </div>
                        <p>{item.product.description}</p>
                        <div className="detailOrder ">
                          <div className="computed listOrder">
                            <div className="quantity">
                              <span
                                className={` decrease ${
                                  item.quantity === 0 ? 'color-grey' : ''
                                }`}
                                onClick={() =>
                                  handleDecrementQuantityCheckout(
                                    item.product.productId
                                  )
                                }
                              >
                                -
                              </span>
                              {item.quantity}
                              {/* {quantity} */}
                              <span
                                className="increase"
                                onClick={() =>
                                  handleIncrementProductCheckout(
                                    item.product.productId
                                  )
                                }
                              >
                                +
                              </span>
                            </div>

                            <div>
                              {(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="noP">You have no products in cart</div>
                )}
              </div>
              <div className="orderInfo">
                <div>
                  <p>Order Info</p>
                  <div className="detailOrder">
                    <p>Subtotal: </p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="detailOrder">
                    <p>Shipping Cost: </p>
                    <p>${shippingCost}</p>
                  </div>
                  <div className="detailOrder total">
                    <p>Total:</p>
                    <p>$ {(subtotal + shippingCost).toFixed(2)} </p>
                  </div>
                </div>
                <button
                  className={`checkoutBtn ${
                    cartItems.length === 0 ? ' bg-disable' : ''
                  }`}
                >
                  Checkout
                </button>
                <button
                  className="continueShoppingBtn"
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
