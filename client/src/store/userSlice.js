import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  GetUserInformation,
  Login,
  Register,
  GetUserAvatar,
} from "../services/UserServices";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") != null,
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
};

export const loginAction = createAsyncThunk(
  "user/login",
  async (data, thunkApi) => {
    try {
      const response = await Login(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const registerAction = createAsyncThunk(
  "user/register",
  async (data, thunkApi) => {
    try {
      const response = await Register(data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUserInformationAction = createAsyncThunk(
  "user/getUser",
  async (data, thunkApi) => {
    try {
      const response = await GetUserInformation();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUserAvatarAction = createAsyncThunk(
  "user/getAvatar",
  async (id, thunkApi) => {
    try {
      const response = await GetUserAvatar(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const token = action.payload.token;
      state.token = token;
      state.isLoggedIn = true;

      localStorage.setItem("token", token);
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      let error = "LOGIN ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(registerAction.fulfilled, (state, action) => {
      toast.success("You have registered successfully.", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      let error = "Error"; // Make a default error message constant somewhere
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
    builder.addCase(getUserInformationAction.fulfilled, (state, action) => {
      state.user = { ...action.payload };
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(getUserInformationAction.rejected, (state, action) => {
      let error = "USER INFORMATION ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(getUserAvatarAction.fulfilled, (state, action) => {
      console.log(action.payload);
      const imageSrc = URL.createObjectURL(new Blob([action.payload]));
      state.user = { ...state.user, imageSrc: imageSrc };
    });
    builder.addCase(getUserAvatarAction.rejected, (state, action) => {
      let error = "IMAGE ERROR"; // Make a default error message constant somewhere
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

export default userSlice.reducer;
