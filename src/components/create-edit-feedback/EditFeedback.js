import { useContext, useState } from "react";
import Form from "./Form"
import FormBtn from "./FormBtn";
import { TextContext } from "../../App";
import { db, collection, doc, deleteDoc, updateDoc, Timestamp } from "../../firebase";

const EditFeedback = ({ id, title, detail, category}) => {
	const categories = useContext(TextContext).categories.slice(1);
	const formText = useContext(TextContext).formText;
	const [currentTitle, setCurrentTitle] = useState(title);
	const [currentDetail, setCurrentDetail] = useState(detail);
	const [currentCategory, setCurrentCategory] = useState(category);

	const deleteFeedback = async () => {
		await deleteDoc(doc(db, 'feedback', id));
	}

	const updateFeedback = async () => {
		await updateDoc(doc(db, 'feedback', id), {
			title: currentTitle,
			detail: currentDetail,
			category: currentCategory,
			date: Timestamp.now()
		})
	}

	return (
		<Form categories={categories} formText={formText} currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} setCurrentDetail={setCurrentDetail} currentDetail={currentDetail} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} heading={`Editing '${title}'`} title={title} symbol='edit' path={`/feedback/${id}`}>
			<FormBtn path={`/feedback/${id}`}>
				<button className="add_feedback_btn" onClick={updateFeedback} type='reset'>Save Changes</button>
			</FormBtn>
			<FormBtn path={`/feedback/${id}`}>
				<button className="add_feedback_btn backgroundColor_gray" type='reset'>Cancel</button>
			</FormBtn>
			<FormBtn>
				<button className="add_feedback_btn background_color_red" onClick={deleteFeedback} type='reset'>Delete</button>
			</FormBtn>
		</Form>
	)
}

export default EditFeedback