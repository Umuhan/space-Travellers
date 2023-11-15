import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  missions: [],
  error: '',
};

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    const response = await axios.get('https://api.spacexdata.com/v3/missions');
    return response.data.map(
      ({ mission_id: missionId, mission_name: missionName, description }) => ({
        missionId,
        missionName,
        description,
      }),
    );
  },
);

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      state.missions = state.missions.map((mission) => {
        if (mission.missionId !== action.payload) {
          return { ...mission };
        }
        return { ...mission, reserved: true };
      });
    },
    leaveMission: (state, action) => {
      state.missions = state.missions.map((mission) => {
        if (mission.missionId !== action.payload) {
          return { ...mission };
        }
        return { ...mission, reserved: false };
      });
    },
  },
  extraReducers: {
    [fetchMissions.pending]: (state) => {
      state.loading = true;
    },
    [fetchMissions.fulfilled]: (state, action) => {
      state.loading = false;
      state.missions = action.payload;
      state.error = '';
    },
    [fetchMissions.rejected]: (state, action) => {
      state.loading = false;
      state.missions = [];
      state.error = action.error.message;
    },
  },
});

export const { joinMission, leaveMission } = missionsSlice.actions;
export default missionsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'https://api.spacexdata.com/v3/missions';

// export const fetchMissions = createAsyncThunk(
//   'missions/fetchMissions',
//   async () => {
//     const response = await axios.get(API_URL);
//     return response.data;
//   },
// );

// export const joinMission = createAsyncThunk(
//   'missions/joinMission',
//   async (missionId) => {
//     const response = await axios.post(`${API_URL}/${missionId}/join`);
//     return response.data;
//   },
// );

// export const leaveMission = createAsyncThunk(
//   'missions/leaveMission',
//   async (missionId) => {
//     const response = await axios.post(`${API_URL}/${missionId}/leave`);
//     return response.data;
//   },
// );

// const missionsSlice = createSlice({
//   name: 'missions',
//   initialState: {
//     missions: [],
//     status: null,
//     error: '',
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMissions.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchMissions.fulfilled, (state, action) => {
//         state.status = 'fulfilled';
//         state.missions = action.payload;
//       })
//       .addCase(fetchMissions.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });

//     builder.addCase(joinMission.fulfilled, (state, action) => {
//       const joinedMissionId = action.payload.mission_id;
//       state.missions = state.missions.map((mission) => (mission.mission_id === joinedMissionId
//         ? { ...mission, reserved: true }
//         : mission));
//     });

//     builder.addCase(leaveMission.fulfilled, (state, action) => {
//       const leftMissionId = action.payload.mission_id;
//       state.missions = state.missions.map((mission) => (mission.mission_id === leftMissionId
//         ? { ...mission, reserved: false }
//         : mission));
//     });
//   },
// });

// export default missionsSlice.reducer;
