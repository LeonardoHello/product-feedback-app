const SortDropdown = ({ name, setSortBy }) => {
	return (
		<li onClick={() => setSortBy(name)} onMouseOver={(e) => e.currentTarget.classList.add('background_color_gray')} onMouseLeave={(e) => e.target.classList.remove('background_color_gray')}>
			<p className="color_gray">{name}</p>
			<span className="material-symbols-outlined check_mark display_none dick">done</span>
		</li>
	)
}

export default SortDropdown