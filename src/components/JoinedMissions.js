import { useSelector } from "react-redux";
const JoinedMissions = () => {
  const { missions } = useSelector((state) => state.missions);
  const reservedMissions = missions.filter((mission) => mission.reserved);
  const joinedMissionsStyling = {
    border: reservedMissions.length === 0 ? "none" : "1px solid #E3E3E3",
    marginTop: "10px",
  };
  return (
    <>
      {reservedMissions.length === 0 && (
        <p className="no-mission">No Missions reserved...</p>
      )}
      <ul style={joinedMissionsStyling}>
        {reservedMissions.map(({ missionName, missionId }) => (
          <li key={missionId} className="item">
            {missionName}
          </li>
        ))}
      </ul>
    </>
  );
};
export default JoinedMissions;
