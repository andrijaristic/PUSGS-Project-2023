import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllProducts,
  GetProductsForLoggedInSeller,
  GetSellerProducts,
  GetProductImage,
  CreateNewProduct,
  UpdateExistingProduct,
  DeleteExistingProduct,
  RestockProduct,
} from "../services/ProductService";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  sellerProducts: [],
  productImages: [],
  productsLoaded: false,
};

export const getAllProductsAction = createAsyncThunk(
  "products/getAll",
  async (data, thunkApi) => {
    try {
      const response = await GetAllProducts();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getProductsForLoggedInSellerAction = createAsyncThunk(
  "products/getForLoggedInSeller",
  async (data, thunkApi) => {
    try {
      const response = await GetProductsForLoggedInSeller();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getSellerProductsAction = createAsyncThunk(
  "products/getForSeller",
  async (id, thunkApi) => {
    try {
      const response = await GetSellerProducts(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getProductImageAction = createAsyncThunk(
  "products/getImage",
  async (id, thunkApi) => {
    try {
      const response = await GetProductImage(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const createNewProductAction = createAsyncThunk(
  "products/create",
  async (data, thunkApi) => {
    try {
      const response = await CreateNewProduct(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateProductAction = createAsyncThunk(
  "products/update",
  async (data, thunkApi) => {
    try {
      const response = await UpdateExistingProduct(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const restockProductAction = createAsyncThunk(
  "products/restock",
  async (data, thunkApi) => {
    try {
      const response = await RestockProduct(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteProductAction = createAsyncThunk(
  "products/delete",
  async (data, thunkApi) => {
    try {
      const response = await DeleteExistingProduct(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
      state.sellerProducts = [];
      state.products = [...action.payload];
      state.productsLoaded = true;
    });
    builder.addCase(getAllProductsAction.rejected, (state, action) => {
      let error = "PRODUCT FETCH ERROR"; // Make a default error message constant somewhere
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
      getProductsForLoggedInSellerAction.fulfilled,
      (state, action) => {
        state.sellerProducts = [...action.payload];
        state.products = [];
      }
    );
    builder.addCase(
      getProductsForLoggedInSellerAction.rejected,
      (state, action) => {
        let error = "PRODUCT FETCH ERROR"; // Make a default error message constant somewhere
        if (typeof action.payload === "string") {
          error = action.payload;
        }

        toast.error(error, {
          position: "top-center",
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    );
    builder.addCase(getSellerProductsAction.fulfilled, (state, action) => {
      state.sellerProducts = [...action.payload];
    });
    builder.addCase(getSellerProductsAction.rejected, (state, action) => {
      let error = "PRODUCT FETCH ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(getProductImageAction.fulfilled, (state, action) => {
      const imageSrc = URL.createObjectURL(new Blob([action.payload]));
      state.productImages.push(imageSrc);
    });
    builder.addCase(getProductImageAction.rejected, (state, action) => {
      let error = "PRODUCT IMAGE FETCH ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(createNewProductAction.fulfilled, (state, action) => {
      toast.success("Product successfully created", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(createNewProductAction.rejected, (state, action) => {
      let error = "PRODUCT CREATE ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      // TODO: Change when update product functionality is implemented
      const { id } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);

      state.products[index] = action.payload;

      toast.success("Product successfully updated", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      let error = "PRODUCT UPDATE ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(restockProductAction.fulfilled, (state, action) => {
      const { id, amount } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);

      state.products[index].amount = amount;
    });
    builder.addCase(restockProductAction.rejected, (state, action) => {
      let error = "PRODUCT RESTOCK ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      // TODO: Change if needed when delete functionality implemented
      // Potentially not because will refresh page and fetch all products again on deletion

      toast.success("Product successfully deleted", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      let error = "PRODUCT DELETE ERROR"; // Make a default error message constant somewhere
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

export default productsSlice.reducer;
