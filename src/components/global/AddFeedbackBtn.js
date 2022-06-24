import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { close } from '../../redux/arrowSlice';

const AddFeedbackBtn = () => {
  const dispatch = useDispatch();
  return (
    <Link to={"/create-feedback"}>
      <button className='add_feedback_btn' onClick={() => dispatch(close())}>+ Add Feedback</button>  
    </Link>
  )
}

export default AddFeedbackBtn