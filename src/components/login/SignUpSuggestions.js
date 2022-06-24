import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import { login } from "../../redux/userSlice";
import { displayError } from '../../redux/errorSlice';
import { auth, signInWithPopup, facebookProvider, githubProvider, googleProvider } from '../../firebase';

const SignUpSuggestions = ({ name }) => {
	const dispatch = useDispatch();

	const popupLogin = async (e) => {
		try {
			const providerData = await signInWithPopup(auth, e.target.classList.contains('facebook') ? facebookProvider : e.target.classList.contains('github') ? githubProvider : e.target.classList.contains('google') ? googleProvider : null);
			dispatch(login(JSON.stringify(providerData)));
		} catch (err) {
			dispatch(displayError(err.code.slice(err.code.indexOf('/') + 1).split('-').join(' ')));
		}
	}
	return (
		<div className="signup_suggestion">
			<p>{name}</p>
			<menu>
				<li><FontAwesomeIcon onClick={popupLogin} className="facebook" icon={faFacebookF} onMouseOver={e => e.target.classList.add('fa-bounce')} onMouseLeave={e => e.target.classList.remove('fa-bounce')} /></li>
				<li><FontAwesomeIcon onClick={popupLogin} className="google" icon={faGoogle} onMouseOver={e => e.target.classList.add('fa-bounce')} onMouseLeave={e => e.target.classList.remove('fa-bounce')} /></li>
				<li><FontAwesomeIcon onClick={popupLogin} className="github" icon={faGithub} onMouseOver={e => e.target.classList.add('fa-bounce')} onMouseLeave={e => e.target.classList.remove('fa-bounce')} /></li>
			</menu>
		</div>		
	)
}

export default SignUpSuggestions