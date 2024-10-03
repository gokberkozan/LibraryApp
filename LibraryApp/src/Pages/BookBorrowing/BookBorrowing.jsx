import { useState, useEffect } from "react";
import { getBookBorrowing, deleteBookBorrowing, createBookBorrowing, updateBookBorrowing } from "../../API/bookborrowing";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function BookBorrowing() {
  const [bookBorrowing, setBookBorrowing] = useState([]);
  const [reload, setReload] = useState(true);
  const [newBookBorrowing, setNewBookBorrowing] = useState({
    borrowerName: "", 
    borrowerMail: "", 
    borrowingDate: "",
    returnDate: "", 
  });
  const [updateBookData, setUpdateBookData] = useState({
    borrowerName: "", 
    borrowerMail: "", 
    borrowingDate: "",
    returnDate: "", 
    id: null
  });
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (reload) {
      getBookBorrowing().then((data) => {
        setBookBorrowing(data);
        setReload(false);
      }).catch((error) => {
        console.error("Error fetching book borrowing data:", error);
      });
    }
  }, [reload]);

  const handleDelete = (id) => {
    deleteBookBorrowing(id).then(() => {
      setReload(true);
    }).catch((error) => {
      console.error("Error deleting book:", error);
    });
  };

  const handleUpdate = () => {
    if (updateBookData.id) {
      updateBookBorrowing(updateBookData).then(() => {
        setReload(true);
      }).catch((error) => {
        console.error("Error updating book:", error);
      });
      setUpdateBookData({
        borrowerName: "", 
        borrowerMail: "", 
        borrowingDate: "",
        returnDate: "", 
        id: null
      });
    }
  };

  const handleNewBookChange = (event) => {
    setNewBookBorrowing({
      ...newBookBorrowing,
      [event.target.name]: event.target.value
    });
  };

  const handleCreate = () => {
    createBookBorrowing(newBookBorrowing).then(() => {
      setReload(true);
    }).catch((error) => {
      console.error("Error creating book:", error);
    });
    setNewBookBorrowing({
      borrowerName: "", 
      borrowerMail: "", 
      borrowingDate: "",
      returnDate: "", 
    });
  };

  const handleUpdateBtn = (bk) => {
    setUpdateBookData({
      borrowerName: bk.borrowerName,
      borrowerMail: bk.borrowerMail,
      borrowingDate: bk.borrowingDate,
      returnDate: bk.returnDate,
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
          placeholder="Borrower Name" 
          name="borrowerName"
          value={newBookBorrowing.borrowerName}
          onChange={handleNewBookChange} />
        <input 
          type="text" 
          placeholder="Borrower Email" 
          name="borrowerMail"
          value={newBookBorrowing.borrowerMail}
          onChange={handleNewBookChange} />
        <input 
          type="date" 
          placeholder="Borrowing Date" 
          name="borrowingDate"
          value={newBookBorrowing.borrowingDate}
          onChange={handleNewBookChange} />
        <input 
          type="date" 
          placeholder="Return Date" 
          name="returnDate"
          value={newBookBorrowing.returnDate}
          onChange={handleNewBookChange} />
        <button onClick={handleCreate}>Add</button>
      </div>

      <div className="book-updatebook">
        <h3>Update Book</h3>
        <input 
          type="text" 
          placeholder="Borrower Name" 
          name="borrowerName"
          value={updateBookData.borrowerName}
          onChange={handleUpdateChange} />
        <input 
          type="text" 
          placeholder="Borrower Email" 
          name="borrowerMail"
          value={updateBookData.borrowerMail}
          onChange={handleUpdateChange} />
        <input 
          type="date" 
          placeholder="Borrowing Date" 
          name="borrowingDate"
          value={updateBookData.borrowingDate}
          onChange={handleUpdateChange} />
        <input 
          type="date" 
          placeholder="Return Date" 
          name="returnDate"
          value={updateBookData.returnDate}
          onChange={handleUpdateChange} />
        <button onClick={handleUpdate}>Update</button>
      </div>

      <div>
        <br />
        <h3>Books</h3>
        <input 
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={handleSearchChange} />
        <button onClick={handleSearchBtn}>Search</button>
        <br />
        {bookBorrowing.map((bk) => (
          <div key={bk.id}>
            {bk.borrowerName} {bk.borrowerMail} {bk.borrowingDate} {bk.returnDate}
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

export default BookBorrowing;