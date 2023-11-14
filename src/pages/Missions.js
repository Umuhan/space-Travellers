import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions } from '../redux/missions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);
  const status = useSelector((state) => state.missions.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMissions());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h2>Missions Page</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading missions data</p>}
      {status === 'succeeded' && (
        <table>
          <thead>
            <tr>
              <th>Mission</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.mission_id}>
                <td>{mission.mission_name}</td>
                <td>{mission.description}</td>

                <td>
                  {mission.reserved ? (
                    <>
                      Active MEMBER
                      <button type="button">Leave Mission</button>
                    </>
                  ) : (
                    <>
                      NOT A MEMBER
                      <button type="button">Join Mission</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Missions;
