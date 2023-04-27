import { all } from 'redux-saga/effects';
import productSaga from './service/product/productSaga';

export default function* mySaga() {
  console.log('In mysaga');
  yield all([productSaga()]);
}
