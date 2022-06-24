import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../redux/userSlice";
import { updatefeedback } from '../../redux/feedbackSlice';
import { show, close } from '../../redux/arrowSlice';
import { auth, db, collection, deleteUser, onSnapshot, query, orderBy, where, limit } from '../../firebase';
import MenuCategories from './MenuCategories';
import SortDropdown from './SortDropdown';
import AddFeedbackBtn from '../global/AddFeedbackBtn';
import FeedbackCollection from '../feedback/FeedbackCollection';
import '../../css/home.css'
import detective from "../../images/illustration-empty.svg"

const Home = ({ categories, sortDropdownList }) => {
	const dispatch = useDispatch();
	const feedback = useSelector((state) => state.feedback.value);
	const arrowIcon = useSelector((state) => state.arrow.value);
	const [menuIcon, setMenuIcon] = useState('menu');
	const [category, setCategory] = useState('All');
	const [sortBy, setSortBy] = useState(sortDropdownList[0]);
	
	useEffect(() => {
		[...document.querySelectorAll('.dropdown > *')].map(elem => {
			if (elem.querySelector('p').innerText === sortBy) {
				elem.querySelector('p').classList.replace('color_gray', 'color_purple');
				elem.querySelector('span').classList.remove('display_none');
			} else {
				elem.querySelector('p').classList.replace('color_purple', 'color_gray');
				elem.querySelector('span').classList.add('display_none');
			}
		});

		const q = query(collection(db, 'feedback'), category !== 'All' ? where('category', '==', category) : limit(1000), sortBy.includes('Most') ? sortBy.includes('Upvotes') ? orderBy('upvotes', 'desc') : sortBy.includes('Comments') ? orderBy('comments', 'desc') : limit(1000) : sortBy.includes('Least') ? sortBy.includes('Upvotes') ? orderBy('upvotes') : sortBy.includes('Comments') ? orderBy('comments') : limit(1000) : null, sortBy === 'Least Recent' ? orderBy('date') : orderBy('date', 'desc'));
		const unsub = onSnapshot(q, (snapshot) => dispatch(updatefeedback(snapshot.docs.map(elem => ({
			id: elem.id,
			title: elem.data().title,
			detail: elem.data().detail,
			category: elem.data().category,
			upvotes: elem.data().upvotes.length,
			comments: elem.data().comments,
			feedbackUid: elem.data().feedbackUid
		}))))) 
		return unsub;
	}, [sortBy, category]);

	useEffect(() => {
		if (menuIcon === 'close') {
			dispatch(close())
			document.getElementById('menu_popup').classList.replace('display_none', 'display_flex');
			document.querySelector('main').classList.add('filterBrightness_50');
			document.querySelector('#main_header').classList.add('pointerEvents_none');
		} else {
			document.getElementById('menu_popup').classList.replace('display_flex', 'display_none');
			document.querySelector('main').classList.remove('filterBrightness_50');
			document.querySelector('#main_header').classList.remove('pointerEvents_none');
		}
	}, [menuIcon]);
 
	useEffect(() => {
		if (arrowIcon === 'less') {
			[...document.querySelectorAll('#sort > p')].map(elem => elem.classList.add('opacity_05'));
			document.querySelector('.dropdown').classList.replace('display_none', 'display_flex');
		} else {
			[...document.querySelectorAll('#sort > p')].map(elem => elem.classList.remove('opacity_05'));document.querySelector('.dropdown').classList.replace('display_flex', 'display_none');
		}
	}, [arrowIcon]);
 
	const toggleArrowIcon = () => {
		arrowIcon === 'less' ?  dispatch(close()) : dispatch(show());
	}
	const toggleMenuIcon = () => {
		menuIcon === 'close' ? setMenuIcon('menu') : setMenuIcon('close');
	}
	const closeMenu = () => {
		setMenuIcon('menu');
	}

	const deletingUser = async () => {
		try {
			await deleteUser(auth.currentUser)
			dispatch(logout());
		} catch (err) {
			console.error(err.code);
			alert(err.code.slice(err.code.indexOf('/') + 1).split('-').join(' '));
			// or alert(err.code.split('/')[1].split('-').join(' '));
		}
	}
	return (
		<div id='home'>
			<header>
				<ul>
					<li>Frontend Mentor</li>
					<li>Feedback Board</li>
				</ul>
				<span onClick={toggleMenuIcon} id='menu_icon' className="material-symbols-outlined">{`${menuIcon}`}</span>
				<div id='menu_popup' className='header_menu display_none'>
					<menu>
						{categories.map((elem, index) => <MenuCategories key={index} name={elem} setMenuIcon={setMenuIcon} setCategory={setCategory} />)}
					</menu>
					<menu>
						<button id='logout' onClick={() => dispatch(logout())}>Log out</button>
					</menu>
					<menu>
						<button id='delete' onClick={deletingUser}>DELETE ACCOUNT</button>
					</menu>
				</div>
			</header>
			<main onClick={closeMenu}>
				<div id='main_header'>
					<div id='sort' onClick={toggleArrowIcon}>
						<p>Sort by:</p>
						<p>{sortBy}</p>
						<span id='home_arrow' className="material-symbols-outlined">{`expand_${arrowIcon}`}</span>
						<ul className='dropdown display_none'>
							{sortDropdownList.map((elem, index) => <SortDropdown key={index} name={elem} setSortBy={setSortBy} />)}
						</ul>
					</div>
					<AddFeedbackBtn/> 
				</div>
				<div id='feedback_collection' onClick={() => dispatch(close())}>
					{feedback.length !== 0 ? feedback.map((elem, index) => <FeedbackCollection key={index} title={elem.title} detail={elem.detail} category={elem.category} upvotes={elem.upvotes} comments={elem.comments} id={elem.id}/>) : 
					<div id='empty_collection' className='feedback'>
						<img src={detective} />
						<div>
							<h2>There is no feedback yet.</h2>
							<p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
							<AddFeedbackBtn/>
						</div>
					</div>}
				</div>
			</main>
		</div> 
	);
}

export default Home