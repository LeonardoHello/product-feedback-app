import { useSelector } from "react-redux";

const Input = ({ type, icon, placeholder, credential }) => {
	const error = useSelector((state) => state.error.value);
	const focusIn = e => {
		e.target.parentElement.classList.add('purple_border_bottom');
		e.target.previousSibling.children[0].classList.add('color_purple')
	}
	const focusOut = e => {
		e.target.parentElement.classList.remove('purple_border_bottom')
		e.target.previousSibling.children[0].classList.remove('color_purple')
	}

	return (
		<div className="input">
			<div className="credentials">
				<label htmlFor={type} >
					<span className="login_icons material-symbols-outlined">{icon}</span>
				</label>
				<input id={type} type={type} placeholder={placeholder} onInput={credential} onFocus={focusIn} onBlur={focusOut} />
			</div>
			<p className={`error ${
				(error === 'invalid email' || error === 'user not found' || error === 'too many requests' || error === 'account exists with different credential') && type === 'e-mail' ?
			  null :
			  error === 'wrong password' && type === 'password' ?
			  null :
			  error === 'internal error' && (type === 'password' || type === 'e-mail') ?
			  null : 'display_none'}`}>
				<small>{error}</small></p>
		</div>
	)
}

export default Input