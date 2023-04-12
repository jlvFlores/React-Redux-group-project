import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelReservedDragon, reserveDragon, selectDragonById, selectIsBooking, selectIsCanceling,
} from '../redux/dragons/dragonsSlice';

const Dragon = ({ id }) => {
  const [dragon] = useSelector((store) => selectDragonById(store, id));
  const isBooking = useSelector((store) => selectIsBooking(store, id));
  const isCanceling = useSelector((store) => selectIsCanceling(store, id));
  const [isTarget, setIsTarget] = useState(false);
  const dispatch = useDispatch();

  const {
    name, description, image, reserved,
  } = dragon;

  useEffect(() => (
    (isBooking || isCanceling)
      ? setIsTarget(true)
      : setIsTarget(false)
  ), [isBooking, isCanceling]);

  const handleClick = (e, dragonId) => (
    e.target.id === 'reserve-dragon'
      ? dispatch(reserveDragon(dragonId))
      : dispatch(cancelReservedDragon(dragonId))
  );

  return (
    <article className="dragon-card">
      <img
        className="dragon-image"
        src={image}
        alt={name}
      />
      <div className="dragon-info">
        <h2>
          {name}
          {reserved && (<span className="tag">Reserved</span>)}
        </h2>
        <p>{description}</p>
        {
          !isTarget ? (
            <button
              type="button"
              id={!reserved ? 'reserve-dragon' : 'cancel-dragon'}
              onClick={(e) => handleClick(e, id)}
              className={`btn btn-dragon ${!reserved ? 'btn-reserve' : 'btn-cancel'}`}
            >
              {!reserved ? 'Reserve' : 'Cancel'}
            </button>
          ) : (
            <p className="dragon-target">{isBooking ? 'Booking...' : 'Canceling...'}</p>
          )
      }
      </div>
    </article>
  );
};

Dragon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Dragon;
