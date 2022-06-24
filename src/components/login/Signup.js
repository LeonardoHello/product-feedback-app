import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "../../firebase";
import { useDispatch } from 'react-redux';
import { displayError } from "../../redux/errorSlice";
import Input from "./Input";
import SignUpSuggestions from "./SignUpSuggestions";

const SignUp = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [photo, setPhoto] = useState(null);	

	const creatingUser = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			dispatch(displayError(err.code.slice(err.code.indexOf('/') + 1).split('-').join(' ')));
		}
		
		try {
			await updateProfile(auth.currentUser, {
				displayName: username, 
				photoURL: photo
			});
		} catch (error) {
			console.error();
		}
	}

	const updatingUsername = (e) => {
		setUsername(e.target.value.trim())
	}
	const updatingEmail = (e) => {
		setEmail(e.target.value.trim())
	}
	const updatingPassword = (e) => {
		setPassword(e.target.value)
	}
	const updatingPhoto = (e) => {
		setPhoto(e.target.value.trim())
	}
	return (
		<div className="login">
			<h1>Sign up</h1>
			<form>
				<Input type='text' icon={'person'} placeholder='Type your username' credential={updatingUsername}/>
				<Input type='e-mail' icon={'email'} placeholder='Type your e-mail' credential={updatingEmail} />
				<Input type='password' icon={'lock'} placeholder='Type your password' credential={updatingPassword} />
				<Input type='url' icon={'photo_camera'} placeholder='Link your photo URL (Optional)' credential={updatingPhoto}/>
				<button type="reset" onClick={creatingUser}>SIGN UP</button>
			</form>
			<SignUpSuggestions name='Or Sign Up Using' />
			<div className="signup_suggestion">
				<p>Already Have An Account?</p>
				<Link to={'/product-feedback-app/login'}>
					<p>LOG IN</p>
				</Link>
			</div>
		</div>
	)
}

export default SignUp