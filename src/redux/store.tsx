import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './reducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from './mySaga';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(mySaga);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, any>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
