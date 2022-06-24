const CategoryDropdown = ({ name, setCurrentCategory }) => {
  return (
    <li onClick={() => setCurrentCategory(name)}>
      <p className="color_gray">{name}</p>
      <span className="material-symbols-outlined check_mark display_none">done</span>
    </li>
  )
}

export default CategoryDropdown