import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { close } from '../../redux/arrowSlice';

const GoBack = ({ path }) => {
  const dispatch = useDispatch();
  return (
    <Link to={path}>
      <button id="back" onClick={() => dispatch(close())}>
        <span id="left_arrow" className="material-symbols-outlined">chevron_left</span>
        <h3>Go Back</h3>
      </button> 
    </Link> 
  )
}

export default GoBack