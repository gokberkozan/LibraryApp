import { useState, useEffect } from "react";
import {getAuthor, deleteAuthor, createAuthor, updateAuthor, searchAuthorByName, } from "../../API/author";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

function Author() {
  const [author, setAuthor] = useState([]);
  const [reload, setReload] = useState(true);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    birthDate: "",
    country: "",
  });
  const [updateAuthorData, setUpdateAuthorData] = useState({
    name: "",
    birthDate: "",
    country: "",
    id: null,
  });

  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (reload) {
      getAuthor().then((data) => {
        setAuthor(data);
        setReload(false);
      });
    }
  }, [reload]);

  const handleDelete = (id) => {
    deleteAuthor(id).then(() => {
      setReload(true);
    });
  };

  const handleCreate = () => {
    createAuthor(newAuthor).then(() => {
      setReload(true);
    });
    setNewAuthor({
      name: "",
      birthDate: "",
      country: "",
    });
  };

  const handleUpdate = () => {
    updateAuthor(updateAuthorData).then(() => {
      setReload(true);
    });
    setUpdateAuthorData({
      name: "",
      birthDate: "",
      country: "",
      id: null,
    });
  };

  const handleUpdateBtn = (author) => {
    setUpdateAuthorData({
      name: author.name,
      birthDate: author.birthDate,
      country: author.country,
      id: author.id,
    });
  };

  const handleSearch = () => {
    searchAuthorByName(searchName).then((data) => {
      setAuthor(data);
    });
  };

  const handleNewAuthorChange = (e) => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateAuthorChange = (e) => {
    setUpdateAuthorData({
      ...updateAuthorData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Author Management</h1>
      <div>
        <h3>Add Author</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newAuthor.name}
          onChange={handleNewAuthorChange}
        />
        <input
          type="text"
          placeholder="BirthDate"
          name="birthDate"
          value={newAuthor.birthDate}
          onChange={handleNewAuthorChange}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={newAuthor.country}
          onChange={handleNewAuthorChange}
        />
        <button onClick={handleCreate}>Add Author</button>
      </div>

      <div>
        <h3>Update Author</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={updateAuthorData.name}
          onChange={handleUpdateAuthorChange}
        />
        <input
          type="text"
          placeholder="BirthDate"
          name="birthDate"
          value={updateAuthorData.birthDate}
          onChange={handleUpdateAuthorChange}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={updateAuthorData.country}
          onChange={handleUpdateAuthorChange}
        />
        <button onClick={handleUpdate}>Update Author</button>
      </div>

      <div>
        <h3>Search Author</h3>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <h3>Author List</h3>
        <ul>
          {author.map((author) => (
            <li key={author.id}>
              {author.name} - {author.birthDate} - {author.country}
              <button onClick={() => handleUpdateBtn(author)}>
                <UpdateIcon />
              </button>
              <button onClick={() => handleDelete(author.id)}>
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Author;
