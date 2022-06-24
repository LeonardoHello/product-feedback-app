const SortDropdown = ({ name, setSortBy }) => {
	return (
		<li onClick={() => setSortBy(name)}>
			<p className="color_gray">{name}</p>
			<span className="material-symbols-outlined check_mark display_none dick">done</span>
		</li>
	)
}

export default SortDropdown