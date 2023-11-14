// src/pages/Rockets.js
import React, { useEffect } from 'react';
import '../components/styles/Rockets.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets);

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  return (
    <div>
      {rockets.map((rocket) => (
        <div key={rocket.id}>{rocket.name}</div>
      ))}
    </div>
  );
};

export default Rockets;
