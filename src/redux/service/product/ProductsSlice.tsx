import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  productId: string;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  newItem?: any;
}

interface ProductState {
  isLoading: boolean;
  error: SerializedError | null;
  products: Product[];
  currentProduct: Product[];
  cartItems: CartItem[];
  quantity: number;
}

const initialState: ProductState = {
  isLoading: false,
  error: null,
  products: [],
  currentProduct: [],
  cartItems: [],
  quantity: 0,
};

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>(
      'http://localhost:4000/api/products'
    );
    return response.data;
  }
);

const productsSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {
    onShowDetailProduct: (
      state,
      action: PayloadAction<{ product: Product }>
    ) => {
      state.currentProduct = [action.payload.product];
    },

    onSendToCart: (state, action: PayloadAction<{ newItem: CartItem }>) => {
      const existingItem = state.cartItems.find(
        (item) =>
          item.product.productId === action.payload.newItem.product.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.newItem.quantity;
      } else {
        state.cartItems.push(action.payload.newItem);
      }
    },

    onDecrementQuantity: (state, action) => {
      state.quantity = action.payload.quantity - 1;
    },
    onIncrementQuantity: (state, action) => {
      state.quantity = action.payload.quantity + 1;
    },

    onDecrementProductCheckout: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item.product.productId === action.payload.id
      );

      if (index !== -1) {
        state.cartItems[index].quantity -= 1;
      }
    },
    onIncrementProductCheckout: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item.product.productId === action.payload.id
      );

      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      }
    },
    onDeleteProduct: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(
        (item: CartItem) => item.product.productId !== action.payload.id
      );
    },
    getProducts: (state) => {
      state.isLoading = true;
    },
    getProductsSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    getProductFail: (state) => {
      state.isLoading = false;
      state.error = new Error('Error');
    },

    getDetailProduct() {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});
export const {
  onShowDetailProduct,
  onSendToCart,
  onDecrementProductCheckout,
  onIncrementProductCheckout,
  onDecrementQuantity,
  onIncrementQuantity,
  onDeleteProduct,
  getProducts,
  getProductsSuccess,
  getProductFail,
  getDetailProduct,
} = productsSlices.actions;

export default productsSlices.reducer;
