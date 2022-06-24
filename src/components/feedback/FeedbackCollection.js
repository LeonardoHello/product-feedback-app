import { auth, db, doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "../../firebase";
import { Link } from "react-router-dom";

const FeedbackCollection = ({ title, detail, category, upvotes, comments, id, children }) => {
	const upvote = async () => {
		const querySnapshot = await getDoc(doc(db, "feedback", id));
		if (querySnapshot.data().upvotes.includes(auth.currentUser.uid)) {
			await updateDoc(doc(db, "feedback", id), {
				upvotes: arrayRemove(auth.currentUser.uid)
			});
		} else {
			await updateDoc(doc(db, "feedback", id), {
				upvotes: arrayUnion(auth.currentUser.uid)
			});
		}
	}
	return (
		<div className="feedback">
			<div className="delete_feedback">
				<h3>{title}</h3>
				{children}
			</div>
			<p>{detail}</p>
			<span>{category}</span>
			<div className="stats">
				<div className="upvotes"  onClick={upvote}>
					<span className="material-symbols-outlined">thumb_up</span>
					<p>{upvotes}</p>
				</div>
				<Link to={`/product-feedback-app/feedback/${id}`}>
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