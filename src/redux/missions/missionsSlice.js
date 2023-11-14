import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  },
);

export const joinMission = createAsyncThunk(
  'missions/joinMission',
  async (missionId) => {
    const response = await axios.post(`${API_URL}/${missionId}/join`);
    return response.data;
  },
);

export const leaveMission = createAsyncThunk(
  'missions/leaveMission',
  async (missionId) => {
    const response = await axios.post(`${API_URL}/${missionId}/leave`);
    return response.data;
  },
);

const missionsSlice = createSlice({
  name: 'missions',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder.addCase(joinMission.fulfilled, (state, action) => {
      const joinedMissionId = action.payload.mission_id;
      state.missions = state.missions.map((mission) => (mission.mission_id === joinedMissionId
        ? { ...mission, reserved: true }
        : mission));
    });

    builder.addCase(leaveMission.fulfilled, (state, action) => {
      const leftMissionId = action.payload.mission_id;
      state.missions = state.missions.map((mission) => (mission.mission_id === leftMissionId
        ? { ...mission, reserved: false }
        : mission));
    });
  },
});

export default missionsSlice.reducer;
