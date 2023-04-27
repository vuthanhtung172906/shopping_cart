import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './service/product/ProductsSlice';

export const rootReducer = combineReducers({
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
