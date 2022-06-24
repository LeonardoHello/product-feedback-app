import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import CreateFeedback from './components/create-feedback/CreateFeedback';
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Feedback from "./components/feedback/Feedback";
import { login } from "./redux/userSlice";
import { auth, browserSessionPersistence, setPersistence, collection, db, onSnapshot, onAuthStateChanged } from "./firebase";
import { updatefeedback } from "./redux/feedbackSlice";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value);
	const feedback = useSelector((state) => state.feedback.value);
  const categories = ['All', 'Feature', 'UI', 'UX', 'Enhancement', 'Bug'];
  const sortDropdownList = ['Most Recent', 'Least Recent', 'Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];
  const formText = {
    'Feedback Title': 'Add a short, descriptive headline',
    'Category': 'Choose a category for your feedback',
    'Feedback Detail': 'Include any specific comments on what should be improved, added, etc.',
  };

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
		const unsub = onSnapshot(collection(db, 'feedback'), (snapshot) => dispatch(updatefeedback(snapshot.docs.map(elem => ({
			id: elem.id,
			title: elem.data().title,
			detail: elem.data().detail,
			category: elem.data().category,
			upvotes: elem.data().upvotes.length,
			comments: elem.data().comments,
      feedbackUid: elem.data().feedbackUid
		})))))
		return unsub;
	}, [])

  return (
    <Routes>
      <Route path="/login" element={JSON.parse(user) === null ? <Login/> : <Navigate to={'/'}/>}/>

      <Route path="/signup" element={JSON.parse(user) === null ? <Signup/> : <Navigate to={'/'}/>}/>

      <Route path="/" element={JSON.parse(user) !== null ? <Home categories={categories} sortDropdownList={sortDropdownList} /> : <Navigate to={'/login'}/>}/>

      <Route path="/create-feedback" element={JSON.parse(user) !== null ? <CreateFeedback categories={categories.slice(1)} formText={formText} /> : <Navigate to={'/login'}/>}/>

      {feedback.map((elem, index) => <Route key={index} path={`/feedback/${elem.id}`} element={JSON.parse(user) === null ? <Login/> : <Feedback feedbackUid={elem.feedbackUid} id={elem.id} title={elem.title} detail={elem.detail} category={elem.category} upvotes={elem.upvotes} comments={elem.comments}/>}/>)}
    </Routes>
  )
}

export default App;