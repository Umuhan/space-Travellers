import { useSelector } from 'react-redux';

const JoinedMissions = () => {
  const { missions } = useSelector((state) => state.missions);

  const reservedMissions = missions.filter((mission) => mission.reserved);

  return (
    <div>
      <div>
        <h3>My Missions</h3>
        {reservedMissions.length === 0 && <p>No missions joined</p>}
        <ul>
          {reservedMissions.map(({ missionName, missionId }) => (
            <li key={missionId}>{missionName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default JoinedMissions;
