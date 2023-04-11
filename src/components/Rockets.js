import { useSelector } from 'react-redux';

const Rockets = () => {
  const { rockets, isLoading } = useSelector((store) => store.rockets);
  if (isLoading) {
    return (
      <div>
        <p>Loading rockets...</p>
      </div>
    );
  }
  return (
    <section className="rockets-section">
      {rockets.map((rocket) => (
        <div className="rocket-card" key={rocket.rocket_id}>
          <img
            className="rocket-image"
            src={rocket.flickr_images[0]}
            alt={rocket.rocket_name}
          />
          <div className="rocket-info">
            <h2>{rocket.rocket_name}</h2>
            <p>{rocket.description}</p>
            <button className="reserve-rocket-btn" type="button">Reserve Rocket</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Rockets;
