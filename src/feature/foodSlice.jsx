import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const baseURL = 'https://fakestoreapi.com/products' 

const initialState = {
  isLoading: false,
  foodData: [],
  cartItem: []
}

let config = {
  method: 'get',
  url: baseURL,
}

export const getFoodData = createAsyncThunk(
  "food/getFood",

  async () => {
    try {
      const response = await axios(config);

      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }

  }
);

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.cartItem.push(payload)
    },
    removeCartItem: (state, { payload }) => {
      state.cartItem = state.cartItem.filter(item => item.id !== payload)
    },
    clearCart: (state) => {
      state.cartItem = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFoodData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFoodData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.foodData = payload;
    });
    builder.addCase(getFoodData.rejected, (state) => {
      state.isLoading = false;
    });
  },
})

export const {addToCart, removeCartItem, clearCart} = foodSlice.actions;
export default foodSlice.reducer;