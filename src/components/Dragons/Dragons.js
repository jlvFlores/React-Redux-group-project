import { shallowEqual, useSelector } from 'react-redux';
import {
  selectAllDragonsIds,
  selectError,
  selectIsLoading,
} from '../../redux/dragons/dragonsSlice';
import Dragon from './Dragon';

const Dragons = () => {
  const dragonsIds = useSelector(selectAllDragonsIds, shallowEqual);
  const dragonsIsLoading = useSelector(selectIsLoading, shallowEqual);
  const errorOcurred = useSelector(selectError, shallowEqual);

  if (dragonsIsLoading) {
    return <div><p>Loading Dragons...</p></div>;
  }

  return (
    <section className="dragons-section">
      { dragonsIds.length === 0 && (
        <div>
          <h3>There are no Dragons</h3>
        </div>
      )}
      { dragonsIds.map((dragonId) => (
        <Dragon
          key={dragonId}
          id={dragonId}
        />
      ))}
      { errorOcurred && (
      <div>
        <h3>Something went wrong.</h3>
        <p>
          <span>Error:</span>
          {errorOcurred}
        </p>
      </div>
      )}
    </section>
  );
};

export default Dragons;
