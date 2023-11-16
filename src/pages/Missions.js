import { Table, Button, Badge } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMissions,
  joinMission,
  leaveMission,
} from '../redux/missions/missionsSlice';

let render = true;
const Missions = () => {
  const { missions, loading, error } = useSelector((state) => state.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!render) {
      return;
    }
    render = false;
    dispatch(fetchMissions());
  }, [dispatch]);

  if (loading) {
    return <h1 className="container align-middle text-center">Loading...</h1>;
  }
  if (error) {
    return <h1 className="container align-middle text-center">{error}</h1>;
  }
  return (
    <Table striped className="container">
      <thead>
        <tr>
          <th>Mission</th>
          <th>Description</th>
          <th colSpan={4}>Status</th>
        </tr>
      </thead>
      <tbody>
        {missions.map(({
          missionId, missionName, description, reserved,
        }) => (
          <tr key={missionId}>
            <td className="bold">{missionName}</td>
            <td>{description}</td>
            <td className="align-middle text-center">
              {reserved ? (
                <Badge className="bold bg-primary" variant="secondary">
                  Active Member
                </Badge>
              ) : (
                <Badge className="bold bg-secondary" variant="secondary">
                  NOT A MEMBER
                </Badge>
              )}
            </td>
            <td className="align-middle text-center">
              {reserved ? (
                <Button
                  className="w-100 btn btn-outline-danger border-2 bold btn-sm"
                  variant="light"
                  onClick={() => dispatch(leaveMission(missionId))}
                >
                  Leave Mission
                </Button>
              ) : (
                <Button
                  className="w-100 btn btn-outline-secondary border-2 bold btn-sm"
                  variant="light"
                  onClick={() => dispatch(joinMission(missionId))}
                >
                  Join Mission
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Missions;
