import { useState, useEffect } from "react";
import { getCategory, deleteCategory, createCategory, updateCategory } from "../../API/category";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function Category() {
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(true);
  const [newCategory, setNewCategory] = useState({
    name: "", 
    description: "", 
  });
  const [updateCategoryData, setUpdateCategoryData] = useState({
    name: "", 
    description: "", 
    id: null
  });
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (reload) {
      getCategory().then((data) => {
        setCategories(data);
        setReload(false);
      }).catch((error) => {
        console.error("Error fetching categories:", error);
      });
    }
  }, [reload]);

  const handleDelete = (id) => {
    deleteCategory(id).then(() => {
      setReload(true);
    }).catch((error) => {
      console.error("Error deleting category:", error);
    });
  };

  const handleUpdate = () => {
    if (updateCategoryData.id) {
      updateCategory(updateCategoryData).then(() => {
        setReload(true);
      }).catch((error) => {
        console.error("Error updating category:", error);
      });
      setUpdateCategoryData({
        name: "", 
        description: "", 
        id: null
      });
    }
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory({
      ...newCategory,
      [event.target.name]: event.target.value
    });
  };

  const handleCreate = () => {
    createCategory(newCategory).then(() => {
      setReload(true);
    }).catch((error) => {
      console.error("Error creating category:", error);
    });
    setNewCategory({
      name: "", 
      description: "", 
    });
  };

  const handleUpdateBtn = (cat) => {
    setUpdateCategoryData({
      name: cat.name,
      description: cat.description,
      id: cat.id
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateCategoryData({
      ...updateCategoryData,
      [event.target.name]: event.target.value
    });
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchBtn = () => {
  };

  return (
    <div>
      <h1>Category Management</h1>
      <br />
      <h3>Add New Category</h3>
      <div className="category-new">
        <input 
          type="text" 
          placeholder="Category Name" 
          name="name"
          value={newCategory.name}
          onChange={handleNewCategoryChange} />
        <input 
          type="text" 
          placeholder="Description" 
          name="description"
          value={newCategory.description}
          onChange={handleNewCategoryChange} />
        <button onClick={handleCreate}>Add</button>
      </div>

      <div className="category-update">
        <h3>Update Category</h3>
        <input 
          type="text" 
          placeholder="Category Name" 
          name="name"
          value={updateCategoryData.name}
          onChange={handleUpdateChange} />
        <input 
          type="text" 
          placeholder="Description" 
          name="description"
          value={updateCategoryData.description}
          onChange={handleUpdateChange} />
        <button onClick={handleUpdate}>Update</button>
      </div>

      <div>
        <br />
        <h3>Categories</h3>
        <input 
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={handleSearchChange} />
        <button onClick={handleSearchBtn}>Search</button>
        <br />
        {categories.map((cat) => (
          <div key={cat.id}>
            {cat.name} - {cat.description}
            <span onClick={() => handleDelete(cat.id)}>
              <DeleteIcon />
            </span>
            <span onClick={() => handleUpdateBtn(cat)}>
              <UpdateIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
