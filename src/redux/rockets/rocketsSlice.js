import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  rockets: [],
  error: "",
};

export const fetchRockets = createAsyncThunk(
  "rockets/fetchRockets",
  async () => {
    const response = await axios.get("https://api.spacexdata.com/v4/rockets");
    console.log(response.data);
    return response.data.map(
      ({
        id: rocketId,
        name: rocketName,
        description,
        flickr_images: rocketImage,
      }) => ({
        rocketId,
        rocketName,
        description,
        rocketImage,
      })
    );
  }
);

const rocketsSlice = createSlice({
  name: "rockets",
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      state.rockets = state.rockets.map((rocket) => {
        if (rocket.rocketId !== action.payload) {
          return { ...rocket };
        }
        return { ...rocket, reserved: true };
      });
    },
    cancelReserve: (state, action) => {
      state.rockets = state.rockets.map((rocket) => {
        if (rocket.rocketId !== action.payload) {
          return { ...rocket };
        }
        return { ...rocket, reserved: false };
      });
    },
  },
  extraReducers: {
    [fetchRockets.pending]: (state) => {
      state.loading = true;
    },
    [fetchRockets.fulfilled]: (state, action) => {
      state.loading = false;
      state.rockets = action.payload;
      state.error = "";
    },
    [fetchRockets.rejected]: (state, action) => {
      state.loading = false;
      state.rockets = [];
      state.error = action.error.message;
    },
  },
});

export const { reserveRocket, cancelReserve } = rocketsSlice.actions;
export default rocketsSlice.reducer;
