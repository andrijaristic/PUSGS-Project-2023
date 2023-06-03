import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllSellers,
  GetAllVerifiedSellers,
  VerifySeller,
} from "../services/UserServices";
import { toast } from "react-toastify";

const initialState = {
  allSellers: [],
  verifiedSellers: [],
};

export const getAllSellersAction = createAsyncThunk(
  "verification/getAllSellers",
  async (data, thunkApi) => {
    try {
      const response = await GetAllSellers();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllVerifiedSellersAction = createAsyncThunk(
  "verification/getAllVerifiedSellers",
  async (data, thunkApi) => {
    try {
      const response = await GetAllVerifiedSellers();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const verifySellerAction = createAsyncThunk(
  "verification/verifySeller",
  async (data, thunkApi) => {
    try {
      console.log(data);
      const response = await VerifySeller(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    clearAllSellers(state) {
      state.allSellers = [];
    },
    clearVerifiedSellers(state) {
      state.verifiedSellers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSellersAction.fulfilled, (state, action) => {
      state.allSellers = [...action.payload];
    });
    builder.addCase(getAllSellersAction.rejected, (state, action) => {
      let error = "SELLER FETCH ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(getAllVerifiedSellersAction.fulfilled, (state, action) => {
      state.verifiedSellers = [...action.payload];
    });
    builder.addCase(getAllVerifiedSellersAction.rejected, (state, action) => {
      let error = "SELLER FETCH ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(verifySellerAction.fulfilled, (state, action) => {
      toast.success("Successfully verified seller", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(verifySellerAction.rejected, (state, action) => {
      let error = "SELLER VERIFICATION ERROR"; // Make a default error message constant somewhere
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

export const { clearAllSellers, clearVerifiedSellers } =
  verificationSlice.actions;

export default verificationSlice.reducer;
