import { useState, useEffect } from "react";
import { getBook, deleteBook, createBook, updateBook } from "../../API/book";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function Book() {
  const [books, setBooks] = useState([]);
  const [reload, setReload] = useState(true);
  const [newBook, setNewBook] = useState({
    name: "", 
    publicationYear: "", 
    stock: ""
  });
  const [updateBookData, setUpdateBookData] = useState({
    name: "", 
    publicationYear: "", 
    stock: "", 
    id: null
  });
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (reload) {
      getBook().then((data) => {
        setBooks(data);
      }).finally(() => {
        setReload(false);
      });
    }
  }, [reload]);

  const handleDelete = (id) => {
    deleteBook(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdate = () => {
    updateBook(updateBookData).then(() => {
      setReload(true);
    });
    setUpdateBookData({
      name: "",
      publicationYear: "",
      stock: "",
      id: null
    });
  };

  const handleNewBookChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value
    });
  };

  const handleCreate = () => {
    createBook(newBook).then(() => {
      setReload(true);
    });
    setNewBook({
      name: "",
      publicationYear: "",
      stock: ""
    });
  };

  const handleUpdateBtn = (bk) => {
    setUpdateBookData({
      name: bk.name,
      publicationYear: bk.publicationYear,
      stock: bk.stock,
      id: bk.id
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateBookData({
      ...updateBookData,
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
      <h1>Book Management</h1>
      <br />
      <h3>Add New Book</h3>
      <div className="book-newbook">
        <input 
          type="text" 
          placeholder="Name" 
          name="name"
          value={newBook.name}
          onChange={handleNewBookChange} />
        <input 
          type="text" 
          placeholder="Publication Year" 
          name="publicationYear"
          value={newBook.publicationYear}
          onChange={handleNewBookChange} />
        <input 
          type="text" 
          placeholder="Stock" 
          name="stock"
          value={newBook.stock}
          onChange={handleNewBookChange} />
        <button onClick={handleCreate}>Add</button>
      </div>

      <div className="book-updatebook">
        <h3>Update Book</h3>
        <input 
          type="text" 
          placeholder="Name" 
          name="name"
          value={updateBookData.name}
          onChange={handleUpdateChange} />
        <input 
          type="text" 
          placeholder="Publication Year" 
          name="publicationYear"
          value={updateBookData.publicationYear}
          onChange={handleUpdateChange} />
        <input 
          type="text" 
          placeholder="Stock" 
          name="stock"
          value={updateBookData.stock}
          onChange={handleUpdateChange} />
        <button onClick={handleUpdate}>Update</button>
      </div>

      <div>
        <br />
        <h3>Books</h3>
        <input 
          type="text"
          placeholder="Search by Name"
          name="search"
          value={searchName}
          onChange={handleSearchChange} />
        <button onClick={handleSearchBtn}>Search</button>
        <br />
        {books.map((bk) => (
          <div key={bk.id}>
            {bk.name} {bk.publicationYear} {bk.stock}
            <span onClick={() => handleDelete(bk.id)}>
              <DeleteIcon />
            </span>
            <span onClick={() => handleUpdateBtn(bk)}>
              <UpdateIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Book;