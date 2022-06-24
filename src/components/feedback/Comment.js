import { auth, db, doc, deleteDoc } from "../../firebase";
import userIcon from "../../images/user-icon.jpg"

const Comment = ({ commentUid, feedbackId, id, name, email, comment, photo }) => {
	const deletingComment = async () => {
		await deleteDoc(doc(db, "feedback", feedbackId, "comments", id));
	}
	return (
		<div className="comment">
			<div>
				<div className="user_info">
					<figure>
						<img src={photo || userIcon} alt="profile picture"/>
						<figcaption>
							<ul>
								<li>{name || `user-${commentUid}`}</li>
								<li>{email}</li>
							</ul>
						</figcaption>
					</figure>
					<span className={`material-symbols-outlined ${auth.currentUser.uid !== commentUid ? 'display_none' : null}`} onClick={deletingComment}>close</span>
				</div>
			</div>
			<p>{comment}</p>
		</div>
	)
}

export default Comment