import { auth, db, doc, onSnapshot, updateDoc, getDoc, arrayUnion, arrayRemove } from "../../firebase";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const FeedbackCollection = ({ title, detail, category, upvotes, comments, id }) => {
	const upvote = async () => {
		const querySnapshot = await getDoc(doc(db, "feedback", id));
		if (querySnapshot.data().upvoted.includes(auth.currentUser.uid)) {
			await updateDoc(doc(db, "feedback", id), {
				upvoted: arrayRemove(auth.currentUser.uid)
			});
		} else {
			await updateDoc(doc(db, "feedback", id), {
				upvoted: arrayUnion(auth.currentUser.uid)
			});
		}
		const unsub = onSnapshot(doc(db, "feedback", id), async (snapshot) => {
			await updateDoc(snapshot.ref, {
				upvotes: snapshot.data().upvoted.length
			})
		}); 
		return unsub
	}

	return (
		<div className="feedback">
			<div className="delete_feedback">
				<h3>{title}</h3>
			</div>
			<p>{detail}</p>
			<span>{category}</span>
			<div className="stats">
				<div className="upvotes" onClick={upvote}>
					<span className="material-symbols-outlined">thumb_up</span>
					<p>{upvotes}</p>
				</div>
				<Link to={`/feedback/${id}`}>
					<div className="comments">
						<span className="material-symbols-outlined">comment</span>
						<p>{comments}</p>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default FeedbackCollection