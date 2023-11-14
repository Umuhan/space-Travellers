import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRockets = createAsyncThunk(
  'rockets/fetchRockets',
  async () => {
    const response = await axios.get('https://api.spacexdata.com/v4/rockets');
    return response.data;
  },
);

export const reserveRocket = createAsyncThunk(
  'rockets/reserveRocket',
  async (rocketId) =>
    // You may want to send a request to a server to handle the reservation
    // For now, we'll simulate it by just returning the rocketId
    rocketId,
);

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: {
    rockets: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(reserveRocket.fulfilled, (state, action) => {
        const reservedRocketId = action.payload;
        state.rockets = state.rockets.map((rocket) => (rocket.id === reservedRocketId
          ? { ...rocket, reserved: true }
          : rocket));
      });
  },
});

export default rocketsSlice.reducer;
