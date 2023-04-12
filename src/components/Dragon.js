import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectDragonById } from '../redux/dragons/dragonsSlice';

const Dragon = ({ id }) => {
  const [dragon] = useSelector((store) => selectDragonById(store, id));
  const { name, description, image } = dragon;

  return (
    <article className="rocket-card">
      <img
        className="rocket-image"
        src={image}
        alt={name}
      />
      <div className="rocket-info">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </article>
  );
};

Dragon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Dragon;
