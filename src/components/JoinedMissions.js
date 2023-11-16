import { useSelector } from "react-redux";
import myprofile from "./styles/myprofile.css";

const JoinedMissions = () => {
  const { missions } = useSelector((state) => state.missions);

  const reservedMissions = missions.filter((mission) => mission.reserved);

  return (
    <div>
      <div>
        <table className="mission-table">
          <thead>
            <tr>
              <th>My Missions</th>
            </tr>
          </thead>

          <tbody>
            {reservedMissions.map(({ missionName, missionId }) => (
              <tr key={missionId}>
                <td>{missionName}</td>
                {/* <td>{rocketId}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default JoinedMissions;
