import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  GetUserInformation,
  Login,
  GoogleLogin,
  Register,
  GetUserAvatar,
  FinishRegistration,
  UpdateUser,
} from "../services/UserServices";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") != null,
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  finishedRegistration:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user")).finishedRegistration
      : false,
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

export const googleLoginAction = createAsyncThunk(
  "user/googleLogin",
  async (data, thunkApi) => {
    try {
      const response = await GoogleLogin(data);
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

export const finishRegistrationAction = createAsyncThunk(
  "user/finishRegistration",
  async (data, thunkApi) => {
    try {
      const response = await FinishRegistration(data);
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

export const updateUserAction = createAsyncThunk(
  "user/update",
  async (data, thunkApi) => {
    try {
      const response = await UpdateUser(data);
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
      state.finishedRegistration = action.payload.finishedRegistration;

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
    builder.addCase(googleLoginAction.fulfilled, (state, action) => {
      const token = action.payload.token;
      state.token = token;
      state.isLoggedIn = true;
      state.finishedRegistration = action.payload.finishedRegistration;

      localStorage.setItem("token", token);
    });
    builder.addCase(googleLoginAction.rejected, (state, action) => {
      let error = "GOOGLE LOGIN ERROR"; // Make a default error message constant somewhere
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
      let error = "REGISTRATION ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(finishRegistrationAction.fulfilled, (state, action) => {
      const token = action.payload.token;
      state.token = token;
      state.isLoggedIn = true;
      state.finishedRegistration = true;

      localStorage.setItem("token", token);

      toast.success("You have registered successfully.", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
    builder.addCase(finishRegistrationAction.rejected, (state, action) => {
      let error = "FINISH REGISTRATION ERROR"; // Make a default error message constant somewhere
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
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.user.name = action.payload.name;
      state.user.address = action.payload.address;
      state.user.dateOfBirth = action.payload.dateOfBirth;

      localStorage.setItem("user", JSON.stringify(state.user));
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      let error = "USER UPDATE ERROR"; // Make a default error message constant somewhere
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
