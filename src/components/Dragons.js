import { useSelector } from 'react-redux';
import { selectAllDragonsIds, selectError, selectIsLoading } from '../redux/dragons/dragonsSlice';

const Dragons = () => {
  const dragonsIds = useSelector(selectAllDragonsIds);
  const dragonsIsLoading = useSelector(selectIsLoading);
  const errorOcurred = useSelector(selectError);

  if (dragonsIsLoading) {
    return <div><p>Loading Dragons...</p></div>;
  }

  return (
    <section className="dragons-section">
      { dragonsIds.map((dragonId) => <article key={dragonId}>{dragonId}</article>)}
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
