import { useSelector } from "react-redux";
import myprofile from "./styles/myprofile.css";

const ReservedRockets = () => {
  const { rockets } = useSelector((state) => state.rockets);

  const reservedRockets = rockets.filter((rocket) => rocket.reserved);

  return (
    <div>
      <div>
        <table className="rocket-table">
          <thead>
            <tr>
              <th>My Rockets</th>
            </tr>
          </thead>

          <tbody>
            {reservedRockets.map(({ rocketName, rocketId }) => (
              <tr key={rocketId}>
                <td>{rocketName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ReservedRockets;
