import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllOrders,
  GetAllOldBuyerOrders,
  GetAllNewBuyerOrders,
  GetAllNewSellerOrders,
  GetAllOldSellerOrders,
  CreateOrder,
  CancelOrder,
} from "../services/OrderService";
import { toast } from "react-toastify";

const initialState = {
  allOrders: [],
  sellerOldOrders: [],
  sellerNewOrders: [],
  buyerOldOrders: [],
  buyerNewOrders: [],
  apiState: "COMPLETED",
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

export const getAllOldBuyerOrdersAction = createAsyncThunk(
  "orders/getAllOldBuyer",
  async (data, thunkApi) => {
    try {
      const response = await GetAllOldBuyerOrders();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllOldSellerOrdersAction = createAsyncThunk(
  "orders/getAllOldSeller",
  async (data, thunkApi) => {
    try {
      const response = await GetAllOldSellerOrders();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllNewBuyerOrdersAction = createAsyncThunk(
  "orders/getAllNewBuyer",
  async (data, thunkApi) => {
    try {
      const response = await GetAllNewBuyerOrders();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllNewSellerOrdersAction = createAsyncThunk(
  "orders/getAllNewSeller",
  async (data, thunkApi) => {
    try {
      const response = await GetAllNewSellerOrders();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const createOrderAction = createAsyncThunk(
  "orders/create",
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
  "orders/cancelOrder",
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
    clearOldBuyerOrders(state, action) {
      state.buyerOldOrders = [];
    },
    clearOldSellerOrders(state, action) {
      state.sellerOldOrders = [];
    },
    clearNewBuyerOrders(state, action) {
      state.buyerNewOrders = [];
    },
    clearNewSellerOrders(state, action) {
      state.sellerNewOrders = [];
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
    builder.addCase(getAllOldBuyerOrdersAction.fulfilled, (state, action) => {
      state.buyerOldOrders = [...action.payload];
    });
    builder.addCase(getAllOldBuyerOrdersAction.rejected, (state, action) => {
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
    builder.addCase(getAllNewBuyerOrdersAction.fulfilled, (state, action) => {
      state.buyerNewOrders = [...action.payload];
    });
    builder.addCase(getAllNewBuyerOrdersAction.rejected, (state, action) => {
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
    builder.addCase(getAllOldSellerOrdersAction.fulfilled, (state, action) => {
      state.sellerOldOrders = [...action.payload];
    });
    builder.addCase(getAllOldSellerOrdersAction.rejected, (state, action) => {
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
    builder.addCase(getAllNewSellerOrdersAction.fulfilled, (state, action) => {
      state.sellerNewOrders = [...action.payload];
    });
    builder.addCase(getAllNewSellerOrdersAction.rejected, (state, action) => {
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
    builder.addCase(createOrderAction.pending, (state, action) => {
      state.apiState = "PENDING";
    });
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      state.apiState = "COMPLETED";

      toast.success("Order successfully created", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(createOrderAction.rejected, (state, action) => {
      state.apiState = "REJECTED";

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

export const {
  clearAllOrders,
  clearNewBuyerOrders,
  clearNewSellerOrders,
  clearOldBuyerOrders,
  clearOldSellerOrders,
} = ordersSlice.actions;
export default ordersSlice.reducer;
