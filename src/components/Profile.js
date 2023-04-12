import React from 'react';
import { useSelector } from 'react-redux';
import { selectReservedDragons } from '../redux/dragons/dragonsSlice';

const Profile = () => {
  const { rockets } = useSelector((store) => store.rockets);
  const dragons = useSelector(selectReservedDragons);

  return (
    <>
      <section className="my-missions">
        <h3>My Missions</h3>
        <div />
      </section>
      <section className="my-rockets">
        <h3>My Rockets</h3>
        <div>
          {rockets.filter((rocket) => rocket.reserved === true).map((rocket) => (
            <div key={rocket.rocket_id}>{rocket.rocket_name}</div>
          ))}
        </div>
      </section>
      <section className="my-dragons">
        <h3>My Dragons</h3>
        <div>
          { dragons.map((dragon) => (<div key={dragon.id}>{dragon.name}</div>)) }
        </div>
      </section>
    </>
  );
};

export default Profile;
