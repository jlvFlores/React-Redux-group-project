import PropTypes from 'prop-types';

const Dragon = ({ id }) => {
  console.log(id);

  return (<article>{id}</article>);
};

Dragon.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Dragon;
