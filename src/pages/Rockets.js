import React, { useEffect } from 'react';
import '../components/styles/Rockets.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets, reserveRocket } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);
  const status = useSelector((state) => state.rockets.status);
  const error = useSelector((state) => state.rockets.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRockets());
    }
  }, [dispatch, status]);

  const handleReserveRocket = (rocketId) => {
    dispatch(reserveRocket(rocketId));
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && (
        <p>
          Error loading rockets:
          {error}
        </p>
      )}
      {status === 'succeeded' && (
        <div>
          <h2>Rockets</h2>
          <ul>
            {rockets.map((rocket) => (
              <li key={rocket.id}>
                <h3>{rocket.rocket_name}</h3>
                <p>{rocket.description}</p>
                <img src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
                <button onClick={() => handleReserveRocket(rocket.id)}>
                  Reserve Rocket
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Rockets;
