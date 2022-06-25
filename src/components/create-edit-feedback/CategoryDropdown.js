const CategoryDropdown = ({ name, setCurrentCategory }) => {
  return (
    <li onClick={() => setCurrentCategory(name)} onMouseOver={(e) => e.currentTarget.classList.add('background_color_gray')} onMouseLeave={(e) => e.target.classList.remove('background_color_gray')}>
      <p className="color_gray">{name}</p>
      <span className="material-symbols-outlined check_mark display_none">done</span>
    </li>
  )
}

export default CategoryDropdown