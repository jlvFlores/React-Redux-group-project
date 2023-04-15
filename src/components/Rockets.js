import { useSelector } from 'react-redux';
import Rocket from './Rocket';

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
        <Rocket
          key={rocket.rocket_id}
          id={rocket.id}
          rocketName={rocket.rocket_name}
          description={rocket.description}
          image={rocket.flickr_images[0]}
          reserved={rocket.reserved}
        />
      ))}
    </section>
  );
};

export default Rockets;
