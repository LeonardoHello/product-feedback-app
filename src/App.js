import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { updatefeedback } from "./redux/feedbackSlice";
import CreateFeedback from './components/create-edit-feedback/CreateFeedback';
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Feedback from "./components/feedback/Feedback";
import EditFeedback from "./components/create-edit-feedback/EditFeedback";
import { login } from "./redux/userSlice";
import { auth, db, collection, onSnapshot, query, browserSessionPersistence, setPersistence, onAuthStateChanged, orderBy, where, limit } from "./firebase";

const App = () => {
	const categories = ['All', 'Feature', 'UI', 'UX', 'Enhancement', 'Bug']
	const sortDropdownList = ['Most Recent', 'Least Recent', 'Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];
	const formText = {
		'Feedback Title': 'Add a short, descriptive headline',
		'Category': 'Choose a category for your feedback',
		'Feedback Detail': 'Include any specific comments on what should be improved, added, etc.',
	};

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value);
	const feedback = useSelector((state) => state.feedback.value);
	const [category, setCategory] = useState('All');
	const [sortBy, setSortBy] = useState(sortDropdownList[0]);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
        await setPersistence(auth, browserSessionPersistence);
			  dispatch(login(JSON.stringify(auth.currentUser)));
			} else {
				console.log('user OFF');
			}
		});
	}, [])

	useEffect(() => {
		const q = query(collection(db, 'feedback'), category !== 'All' ? where('category', '==', category) : limit(1000), sortBy.includes('Most') ? sortBy.includes('Upvotes') ? orderBy('upvotes', 'desc') : sortBy.includes('Comments') ? orderBy('comments', 'desc') : limit(1000) : sortBy.includes('Least') ? sortBy.includes('Upvotes') ? orderBy('upvotes') : sortBy.includes('Comments') ? orderBy('comments') : limit(1000) : null, sortBy === 'Least Recent' ? orderBy('date') : orderBy('date', 'desc'));
		const unsub = onSnapshot(q, (snapshot) => {
			dispatch(updatefeedback(snapshot.docs.map(elem => ({
			id: elem.id,
			title: elem.data().title,
			detail: elem.data().detail,
			category: elem.data().category,
			upvoted: elem.data().upvoted,
			upvotes: elem.data().upvotes,
			comments: elem.data().comments,
			feedbackUid: elem.data().feedbackUid
		}))))});
		return unsub;
	}, [category, sortBy])


  return (
		<TextContext.Provider value={{categories, sortDropdownList, formText}}>
			<Routes>
				<Route path="/login" element={JSON.parse(user) === null ? <Login/> : <Navigate to={'/'}/>}/>

				<Route path="/signup" element={JSON.parse(user) === null ? <Signup/> : <Navigate to={'/'}/>}/>

				<Route path="/" element={JSON.parse(user) !== null ? <Home setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} /> : <Navigate to={'/login'}/>}/>

				<Route path="/create-feedback" element={JSON.parse(user) !== null ? <CreateFeedback/> : <Navigate to={'/login'}/>}/>
				
				{feedback.map((elem, index) => <Route key={index} path={`/feedback/${elem.id}`} element={JSON.parse(user) === null ? <Login/> : <Feedback feedbackUid={elem.feedbackUid} id={elem.id} title={elem.title} detail={elem.detail} category={elem.category} upvoted={elem.upvoted} upvotes={elem.upvotes} comments={elem.comments}/>}/>)}

				{feedback.map((elem, index) => <Route key={index} path={`/feedback/${elem.id}/edit`} element={JSON.parse(user) === null ? <Login/> : <EditFeedback id={elem.id} title={elem.title} detail={elem.detail} category={elem.category}/>}/>)}
			</Routes>
		</TextContext.Provider>
  )
}

export default App;
export const TextContext = React.createContext()