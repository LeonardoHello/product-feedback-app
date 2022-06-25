import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../firebase";
import { useDispatch } from 'react-redux';
import { login } from "../../redux/userSlice";
import { displayError } from "../../redux/errorSlice";
import SignUpSuggestions from "./SignUpSuggestions";
import Input from "./Input";
import '../../css/login.css'

const Login = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loggingIn = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			dispatch(login(JSON.stringify(userCredential.currentUser)));
		} catch (err) {
			dispatch(displayError(err.code.slice(err.code.indexOf('/') + 1).split('-').join(' ')));
		}
	}

	const updatingEmail = (e) => {
		setEmail(e.target.value);
	}
	const updatingPassword = (e) => {
		setPassword(e.target.value);
	}
	return (
		<div className="login">
			<h1>Login</h1>
			<form>
				<Input name='E-mail' type='e-mail' icon={'mail'} placeholder='Type your e-mail' credential={updatingEmail} />
				<Input name='Password' type='password' icon={'lock'} placeholder='Type your password' credential={updatingPassword}/>
				<p><small>Forgot password?</small></p>
				<button type="reset" onClick={loggingIn}>LOG IN</button>
			</form>
			<SignUpSuggestions name='Or Log In Using' />
			<div className="signup_suggestion">
				<p>Don't Have An Account?</p>
				<Link to={'/signup'}>
					<p>SIGN UP</p>
				</Link>
			</div>
		</div>
	)
}

export default Login