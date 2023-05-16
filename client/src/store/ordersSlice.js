import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllOrders,
  GetAllValidBuyerOrders,
  GetAllValidSellerOrders,
  CreateOrder,
  CancelOrder,
} from "../services/OrderService";
import { toast } from "react-toastify";

const initialState = {
  allOrders: [],
  sellerOrders: [],
  buyerOrders: [],
};

export const getAllOrdersAction = createAsyncThunk(
  "orders/getAll",
  async (data, thunkApi) => {
    try {
      const response = await GetAllOrders();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllValidBuyerOrdersAction = createAsyncThunk(
  "orders/getAllBuyer",
  async (data, thunkApi) => {
    try {
      const response = await GetAllValidBuyerOrders();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllValidSellerOrdersAction = createAsyncThunk(
  "orders/getAllSeller",
  async (data, thunkApi) => {
    try {
      const response = await GetAllValidSellerOrders();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const createOrderAction = createAsyncThunk(
  "orders/getAll",
  async (data, thunkApi) => {
    try {
      const response = await CreateOrder(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const cancelOrderAction = createAsyncThunk(
  "orders/getAll",
  async (data, thunkApi) => {
    try {
      const response = await CancelOrder(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearAllOrders(state, action) {
      state.allOrders = [];
    },
    clearBuyerOrders(state, action) {
      state.buyerOrders = [];
    },
    clearSellerOrders(state, action) {
      state.sellerOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrdersAction.fulfilled, (state, action) => {
      state.allOrders = [...action.payload];
    });
    builder.addCase(getAllOrdersAction.rejected, (state, action) => {
      let error = "ORDER FETCH ERROR"; // Make a default error message constant somewhere
      if (typeof action.payload === "string") {
        error = action.payload;
      }

      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(getAllValidBuyerOrdersAction.fulfilled, (state, action) => {
      state.buyerOrders = [...action.payload];
    });
    builder.addCase(getAllValidBuyerOrdersAction.rejected, (state, action) => {
      let error = "BUYER ORDER FETCH ERROR"; // Make a default error message constant somewhere
      if (typeof action.payload === "string") {
        error = action.payload;
      }

      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(
      getAllValidSellerOrdersAction.fulfilled,
      (state, action) => {
        state.sellerOrders = [...action.payload];
      }
    );
    builder.addCase(getAllValidSellerOrdersAction.rejected, (state, action) => {
      let error = "SELLER ORDER FETCH ERROR"; // Make a default error message constant somewhere
      if (typeof action.payload === "string") {
        error = action.payload;
      }

      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      toast.success("Order successfully created", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(createOrderAction.rejected, (state, action) => {
      let error = "ORDER CREATE ERROR"; // Make a default error message constant somewhere
      if (typeof action.payload === "string") {
        error = action.payload;
      }

      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(cancelOrderAction.fulfilled, (state, action) => {
      toast.success("Order successfully cancelled", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(cancelOrderAction.rejected, (state, action) => {
      let error = "ORDER CANCEL ERROR"; // Make a default error message constant somewhere
      if (typeof action.payload === "string") {
        error = action.payload;
      }

      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
  },
});

export const { clearAllOrders, clearBuyerOrders, clearSellerOrders } =
  ordersSlice.actions;
export default ordersSlice.reducer;
