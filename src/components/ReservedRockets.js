import { useSelector } from "react-redux";
const ReservedRockets = () => {
  const { rockets } = useSelector((state) => state.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  const reservedRocketsStyling = {
    border: reservedRockets.length === 0 ? "none" : "1px solid #E3E3E3",
    marginTop: "10px",
  };
  return (
    <>
      {reservedRockets.length === 0 && (
        <p className="no-rockets">No Rockets reserved...</p>
      )}
      <ul style={reservedRocketsStyling}>
        {reservedRockets.map(({ rocketName, rocketId }) => (
          <li key={rocketId} className="item">
            {rocketName}
          </li>
        ))}
      </ul>
    </>
  );
};
export default ReservedRockets;
