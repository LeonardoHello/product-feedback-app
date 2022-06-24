import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { show, close } from '../../redux/arrowSlice';
import { db, collection, addDoc, Timestamp, auth } from "../../firebase";
import FillOutForm from "./FillOutForm";
import CategoryDropdown from "./CategoryDropdown";
import GoBack from "../global/GoBack";
import '../../css/create-feedback.css';

const CreateNewFeedback = ({ categories, formText }) => {
	const dispatch = useDispatch();
	const arrowIcon = useSelector((state) => state.arrow.value);
	const [currentTitle, setCurrentTitle] = useState('');
	const [currentCategory, setCurrentCategory] = useState(categories[0]);
	const [currentDetail, setCurrentDetail] = useState('');

	useEffect(() => {
		if (arrowIcon === 'less') {
			document.querySelector('.dropdown').classList.replace('display_none', 'display_flex');
		} else {
			document.querySelector('.dropdown').classList.replace('display_flex', 'display_none');
		}
	}, [arrowIcon]);

	useEffect(() => {
		[...document.querySelectorAll('#category_dropdown > li')].map(elem => {
			if (elem.querySelector('p').innerText === currentCategory) {
				elem.querySelector('p').classList.replace('color_gray', 'color_purple');
				elem.querySelector('span').classList.remove('display_none');
			} else {
				elem.querySelector('p').classList.replace('color_purple', 'color_gray');
				elem.querySelector('span').classList.add('display_none');
			}
		})
	}, [currentCategory])

	const toggleArrowIcon = () => {
		arrowIcon === 'less' ?  dispatch(close()) : dispatch(show());
	}

	const creatingFeedback = async () => {
		try {
			await addDoc(collection(db, "feedback"), {
				title: currentTitle,
				category: currentCategory,
				detail: currentDetail,
				upvotes: [],
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
		<div id="create_feedback">
			<GoBack/>
			<form>
				<span id="plus" className="material-symbols-outlined">add</span>
				<h2>Create New Feedback</h2>
				<div id="feedback_categories">
					<FillOutForm dt={Object.keys(formText)[0]} dd={Object.values(formText)[0]} >
						<input type='text' onInput={e => setCurrentTitle(e.target.value)} onFocus={e => e.target.style.outline = "1px solid blue"} onBlur={e => e.target.style.outline = "unset"} />
					</FillOutForm>

					<FillOutForm dt={Object.keys(formText)[1]} dd={Object.values(formText)[1]} >
					<div id="input" onClick={toggleArrowIcon}>
						<p>{currentCategory}</p>
						<span id="createFeedback_arrow" className="material-symbols-outlined">{`expand_${arrowIcon}`}</span>
						<ul id="category_dropdown" className="dropdown display_none">
							{categories.map((elem, index) => <CategoryDropdown key={index} name={elem} setCurrentCategory={setCurrentCategory}/>)}
						</ul>
					</div>
					</FillOutForm>

					<FillOutForm dt={Object.keys(formText)[2]} dd={Object.values(formText)[2]} >
						<textarea onInput={e => setCurrentDetail(e.target.value)} onFocus={e => e.target.style.outline = "1px solid #4661e6"} onBlur={e => e.target.style.outline = "unset"} />
					</FillOutForm>
					<menu>
						<li>
							<Link to={'/product-feedback-app'}>
								<button className="add_feedback_btn" type='reset' onClick={creatingFeedback} >Add Feedback</button>
							</Link>
						</li>
						<li>
							<Link to={'/product-feedback-app'}>
								<button className="add_feedback_btn backgroundColor_gray" type='reset' onClick={() => dispatch(close())} >Cancel</button>
							</Link>
						</li>
					</menu>
				</div>
			</form>
		</div>
	)
}

export default CreateNewFeedback