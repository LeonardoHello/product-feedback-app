const Category = ({ name, setMenuIcon, setCategory }) => {
  const settingCategory = () => {
    setMenuIcon('menu');
    setCategory(name);
  }
  return (
   	<li onClick={settingCategory}>{name}</li>
  )
}

export default Category