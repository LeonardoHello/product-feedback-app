import { Link } from "react-router-dom";
import FeedbackCollection from "./FeedbackCollection";
import GoBack from "../global/GoBack";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import { auth, db, collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, Timestamp, query, orderBy } from "../../firebase";
import "../../css/feedback.css";

const Feedback = ({ feedbackUid, id, title, detail, category, upvotes, comments }) => {
	const [charCount, setCharCount] = useState(250);
	const [message, setMessage] = useState('');
	const [commentSection, setCommentSection] = useState([])

	useEffect(() => {
		const q = query(collection(db, "feedback", id, "comments"), orderBy('date'))
		const unsub = onSnapshot(q, async (snapshot) => {
			await updateDoc(doc(db, "feedback", id), {
				comments: snapshot.docs.length
			})
			setCommentSection(snapshot.docs);
		});
		return unsub;
	}, []);

	const settingComments = async () => {
		if (message.trim().length !== 0) {
			await addDoc(collection(db, "feedback", id, "comments"), {
				name: auth.currentUser.displayName,
				mail: auth.currentUser.email,
				photo: auth.currentUser.photoURL,
				comment: message,
				commentUid: auth.currentUser.uid,
				date: Timestamp.now()
			})
		}
	}

	const settingMessage = (e) => {
		setCharCount(250 - e.currentTarget.value.length);
		setMessage(e.currentTarget.value);
	}
	return (
		<div id="feedback_comments">
			<div id="edit_feedback">
				<GoBack path={'/'}/>
				{feedbackUid === auth.currentUser.uid ? 
					<Link to={`/feedback/${id}/edit`}>
						<button id="edit_feedback_btn" className="add_feedback_btn">Edit Feedback</button>
					</Link> : <button id="edit_feedback_btn" onClick={() => alert('You do not have permission to edit this post.')} className="add_feedback_btn">Edit Feedback</button>}
			</div>
			<FeedbackCollection title={title} detail={detail} category={category} upvotes={upvotes} comments={comments} id={id}/>
			<div id="comment_section">
				<h2>{`${comments} Comments`}</h2>
				{commentSection.map((elem, index) => <Comment key={index} commentUid={elem.data().commentUid} feedbackId={id} id={elem.id} name={elem.data().name} email={elem.data().mail} comment={elem.data().comment} photo={elem.data().photo}/>)}
			</div>
			<form>
				<h2>Add Comment</h2>
				<textarea maxLength={250} placeholder="Type your comment here..." onInput={settingMessage} onFocus={e => e.target.style.outline = ".1px solid #4661e6"} onBlur={e => e.target.style.outline = "unset"}/>
				<div id="posting_comment">
					<p>{charCount} Character left</p>
					<button className="add_feedback_btn" onClick={settingComments} type={"reset"} >Post Comment</button>
				</div>
			</form>
		</div>
	)
}

export default Feedback