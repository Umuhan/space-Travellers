import React from 'react';
import '../components/styles/myprofile.css';
import JoinedMissions from '../components/JoinedMissions';
import ReservedRockets from '../components/ReservedRockets';

const MyProfile = () => (
  <div className="profile-container">
    <div className="rockets-container">
      <h2>My Rockets</h2>
      <ReservedRockets />
    </div>
    <div className="mission-container">
      <h2>My Missions</h2>
      <JoinedMissions />
    </div>
  </div>
);
export default MyProfile;
