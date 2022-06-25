import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { show, close } from '../../redux/arrowSlice';
import FillOutForm from './FillOutForm';
import CategoryDropdown from "./CategoryDropdown";
import GoBack from "../global/GoBack";

const Form = ({ children, symbol, heading, categories, formText, currentTitle, setCurrentTitle, currentDetail, setCurrentDetail, currentCategory, setCurrentCategory, path }) => {
	const dispatch = useDispatch();
	const arrowIcon = useSelector((state) => state.arrow.value);

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

	return (
		<div id="create_feedback">
			<GoBack path={path}/>
			<form>
				<span id="plus" className="material-symbols-outlined">{symbol}</span>
				<h2>{heading}</h2>
				<div id="feedback_categories">
					<FillOutForm dt={Object.keys(formText)[0]} dd={Object.values(formText)[0]} >
						<input type='text' value={currentTitle} onInput={e => setCurrentTitle(e.target.value)} onFocus={e => e.target.style.outline = "1px solid blue"} onBlur={e => e.target.style.outline = "unset"} />
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
						<textarea value={currentDetail} onInput={e => setCurrentDetail(e.target.value)} onFocus={e => e.target.style.outline = "1px solid #4661e6"} onBlur={e => e.target.style.outline = "unset"} />
					</FillOutForm>
					<menu>
						{children}
					</menu>
				</div>
			</form>
		</div>
	)
}

export default Form