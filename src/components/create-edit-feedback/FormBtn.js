import React from 'react'
import { Link } from 'react-router-dom'

const FormBtn = ({ children, path }) => {
	return (
		<li>
			<Link to={path || '/'}>
				{children}
			</Link>
		</li>
	)
}

export default FormBtn