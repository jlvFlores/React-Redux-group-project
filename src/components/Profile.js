import React from 'react';
import { useSelector } from 'react-redux';
import { selectReservedDragons } from '../redux/dragons/dragonsSlice';

const Profile = () => {
  const { rockets } = useSelector((store) => store.rockets);
  const dragons = useSelector(selectReservedDragons);

  return (
    <div className="profile-sections">
      <section className="my-missions">
        <h3>My Missions</h3>
        <div />
      </section>
      <section className="my-rockets">
        <h3>My Rockets</h3>
        <div>
          {rockets.filter((rocket) => rocket.reserved === true).map((rocket) => (
            <div key={rocket.rocket_id} className="profile-card">{rocket.rocket_name}</div>
          ))}
        </div>
      </section>
      <section className="my-dragons">
        <h3>My Dragons</h3>
        <div>
          { dragons.map((dragon) => (<div key={dragon.id} className="profile-card">{dragon.name}</div>)) }
        </div>
      </section>
    </div>
  );
};

export default Profile;
