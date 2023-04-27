import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getDetailProduct,
  getProductFail,
  getProducts,
  getProductsSuccess,
  Product,
} from './ProductsSlice';

function getAllProduct() {
  return axios.get('http://localhost:4000/api/products');
}

function* handleGetAllProduct() {
  try {
    const res: Product[] = yield getAllProduct();
    yield put(getProductsSuccess((res as any).data));
  } catch (error) {
    yield put(getProductFail());
  }
}
function* handleGetDetailProduct() {
  // .....
}
export default function* productSaga() {
  // arg1: action_name , arg2: function call khi action arg1 goi
  yield takeLatest(getProducts.type, handleGetAllProduct);
  yield takeLatest(getDetailProduct.type, handleGetDetailProduct);
}
