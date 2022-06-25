import { useContext, useState } from "react";
import { useDispatch } from 'react-redux';
import { close } from '../../redux/arrowSlice';
import { db, collection, addDoc, Timestamp, auth } from "../../firebase";
import '../../css/create-edit-feedback.css';
import Form from "./Form";
import FormBtn from "./FormBtn";
import { TextContext } from "../../App";

const CreateNewFeedback = () => {
	const dispatch = useDispatch();
	const categories = useContext(TextContext).categories.slice(1);
	const formText = useContext(TextContext).formText;
	const [currentTitle, setCurrentTitle] = useState('');
	const [currentDetail, setCurrentDetail] = useState('');
	const [currentCategory, setCurrentCategory] = useState(categories[0]);

	const creatingFeedback = async () => {
		try {
			await addDoc(collection(db, "feedback"), {
				title: currentTitle,
				category: currentCategory,
				detail: currentDetail,
				upvoted: [],
				upvotes: 0,
				comments: 0,
				feedbackUid: auth.currentUser.uid,
				date: Timestamp.now()
			});
			dispatch(close());
		} catch (error) {
			console.error("Error adding document: ", error);
		}
	}
	return (
		<Form categories={categories} formText={formText} setCurrentTitle={setCurrentTitle} setCurrentDetail={setCurrentDetail} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} heading='Create New Feedback' symbol="add" path={'/'} >
			<FormBtn>
				<button className="add_feedback_btn" type='reset' onClick={creatingFeedback} >Add Feedback</button>
			</FormBtn>
			<FormBtn>
				<button className="add_feedback_btn backgroundColor_gray" type='reset' onClick={() => dispatch(close())} >Cancel</button>
			</FormBtn>
		</Form>
	)
}

export default CreateNewFeedback