import React, { useEffect } from 'react';
import '../components/styles/Rockets.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRockets,
  reserveRocket,
  cancelReserve,
} from '../redux/rockets/rocketsSlice';

let render = true;
const Rockets = () => {
  const { rockets } = useSelector((state) => state.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!render) {
      return;
    }
    render = false;
    dispatch(fetchRockets());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {rockets.map((rocket) => {
          const {
            rocketId, rocketName, description, rocketImage,
          } = rocket;
          return (
            <li key={rocketId} className="list">
              <img
                src={rocketImage[0]}
                alt={rocketName}
                className="rocket-img"
              />
              <div className="description">
                <h3>{rocketName}</h3>

                <div className="reserved-info">
                  <p>
                    {rocket.reserved && (
                      <button type="button" className="reserve-btn">
                        Reserved
                      </button>
                    )}
                    {description}
                  </p>
                </div>
                {!rocket.reserved && (
                  <button
                    className="rocket-btn"
                    type="button"
                    onClick={() => dispatch(reserveRocket(rocketId))}
                  >
                    Reserve Rocket
                  </button>
                )}
                {rocket.reserved && (
                  <button
                    className="rocket-btn btn-cancle"
                    type="button"
                    onClick={() => dispatch(cancelReserve(rocketId))}
                  >
                    {' '}
                    Cancel Reservation
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Rockets;
