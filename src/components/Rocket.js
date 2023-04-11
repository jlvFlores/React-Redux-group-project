import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reserveRocket } from '../store/rockets/rocketsSlice';

const Rocket = ({
  id, rocketName, description, image, reserved,
}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (reserved) {
      setMessage('Reserved');
    } else {
      setMessage('');
    }
  }, [reserved]);

  const handleClick = () => {
    dispatch(reserveRocket(id));
  };

  return (
    <div className="rocket-card">
      <img
        className="rocket-image"
        src={image}
        alt={rocketName}
      />
      <div className="rocket-info">
        <h2>{rocketName}</h2>
        <p>
          <span className="tag">{message}</span>
          {description}
        </p>
        {reserved
          ? <button className="btn cancel-reserve-rocket-btn" type="button" onClick={handleClick}>Cancel Reservation</button>
          : <button className="btn reserve-rocket-btn" type="button" onClick={handleClick}>Reserve Rocket</button>}
      </div>
    </div>
  );
};

Rocket.propTypes = {
  id: PropTypes.number.isRequired,
  rocketName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default Rocket;
