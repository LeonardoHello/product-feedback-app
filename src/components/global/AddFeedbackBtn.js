import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { close } from '../../redux/arrowSlice';

const AddFeedbackBtn = () => {
  const dispatch = useDispatch();
  return (
    <Link to={"/create-feedback"}>
      <button className='add_feedback_btn' onClick={() => dispatch(close())} onMouseOver={(e) => e.currentTarget.classList.add('background_color_light_purple')} onMouseLeave={(e) => e.target.classList.remove('background_color_light_purple')}>+ Add Feedback</button>  
    </Link>
  )
}

export default AddFeedbackBtn